# H.I. Brands - deploy to Namecheap shared hosting (cPanel), fully from PowerShell.
#
# What this does:
#   1. Builds the React frontend and reuses the existing Laravel vendor/ folder.
#   2. Writes a production .env (MySQL, debug off, your new admin password).
#   3. Stages a merged web root (Laravel public/ + React dist/) with a custom
#      .htaccess that routes /api/* to Laravel and everything else to the SPA.
#   4. Uploads everything over SFTP (port varies per host - check cPanel >
#      Manage SSH > Access Details for the real port; often not 2222).
#   5. Runs migrations via a one-time, token-protected PHP endpoint, then
#      deletes that endpoint immediately.
#
# You will be prompted for the domain and cPanel host/username/password. The
# MySQL database can either be created for you via the cPanel API (needs an
# API token - cPanel > Security > Manage API Tokens > Create) or you can
# create it yourself first in cPanel > MySQL Databases and enter its details.
# Nothing you type is hardcoded into this file or shown in chat - secrets go
# through Get-Credential / Read-Host -AsSecureString and only touch memory and
# the files staged for upload.
#
# Run from the H.I.Brand folder:  .\deploy.ps1

$ErrorActionPreference = 'Stop'
$root    = $PSScriptRoot
$backend = Join-Path $root 'backend'
$frontend = Join-Path $root 'frontend'
$stage   = Join-Path $root '_deploy_stage'

function Read-PlainSecret($prompt) {
    $s = Read-Host -Prompt $prompt -AsSecureString
    [System.Net.NetworkCredential]::new('', $s).Password
}

function New-RandomPassword([int]$Length = 24) {
    -join ((48..57) + (65..90) + (97..122) | Get-Random -Count $Length | ForEach-Object { [char]$_ })
}

# ---------------------------------------------------------------------------
# 1. Collect deployment settings
# ---------------------------------------------------------------------------
Write-Host "`n== Site & hosting ==" -ForegroundColor Cyan
$Domain        = Read-Host "Domain (e.g. hibrands.com, no https://)"
$CPanelHostName = Read-Host "SFTP/cPanel hostname (from your hosting welcome email, e.g. server123.web-hosting.com)"
$SftpPort      = Read-Host "SFTP port (check cPanel > Manage SSH > Access Details > 'SSH port' - often not 2222) [2222]"
if (-not $SftpPort) { $SftpPort = 2222 }
$CPanelUser    = Read-Host "cPanel username"

$useKeyAns = Read-Host "Authenticate SFTP with an SSH key instead of a password? (Y/n)"
$UseKeyAuth = -not ($useKeyAns -match '^[Nn]')

if ($UseKeyAuth) {
    $KeyFilePath = Read-Host "Path to the private key file you downloaded from cPanel > Manage SSH Keys"
    $KeyPassphrase = Read-PlainSecret "Key passphrase (leave blank at the prompt if you didn't set one)"
    $securePass = ConvertTo-SecureString $KeyPassphrase -AsPlainText -Force
    $CPanelCred = New-Object System.Management.Automation.PSCredential($CPanelUser, $securePass)
} else {
    $CPanelCred = Get-Credential -UserName $CPanelUser -Message "cPanel password (used for SFTP)"
}

$RemoteAppDir = Read-Host "Remote folder name for the Laravel app, kept outside public_html [hibrand_app]"
if (-not $RemoteAppDir) { $RemoteAppDir = 'hibrand_app' }

$docRootAns = Read-Host "Did you set this domain's cPanel Document Root to '$RemoteAppDir/public'? (y/N)"
$UseCustomDocRoot = $docRootAns -match '^[Yy]'

Write-Host "`n== Production database ==" -ForegroundColor Cyan
$autoDbAns = Read-Host "Create the MySQL database + user automatically via the cPanel API? (Y/n)"
$AutoCreateDb = -not ($autoDbAns -match '^[Nn]')

if ($AutoCreateDb) {
    Write-Host "Needs a cPanel API token, not your password: cPanel > Security > Manage API Tokens > Create." -ForegroundColor Yellow
    $ApiToken = Read-PlainSecret "cPanel API token"

    $dbSuffix     = Read-Host "Database name suffix [hibrand]"
    if (-not $dbSuffix) { $dbSuffix = 'hibrand' }
    $dbUserSuffix = Read-Host "Database username suffix [hibrand]"
    if (-not $dbUserSuffix) { $dbUserSuffix = 'hibrand' }

    $DbPass = New-RandomPassword
    $cpanelAuthHeader = @{ Authorization = "cpanel ${CPanelUser}:${ApiToken}" }
    $cpanelBase = "https://${CPanelHostName}:2083/execute"

    function Invoke-UAPI([string]$Path) {
        $resp = Invoke-RestMethod -Uri "$cpanelBase/$Path" -Headers $cpanelAuthHeader -ErrorAction Stop
        if (-not $resp.status) { throw "cPanel API call failed for '$Path': $($resp.errors -join '; ')" }
        $resp
    }

    # This account's UAPI wants the cPanel-account prefix included up front,
    # not auto-added - so build the full names ourselves.
    $DbFullName     = "${CPanelUser}_$dbSuffix"
    $DbUserFullName = "${CPanelUser}_$dbUserSuffix"

    Write-Host "Creating database via cPanel API ..." -ForegroundColor Cyan
    $enc = { param($v) [uri]::EscapeDataString($v) }
    $dbResp = Invoke-UAPI "Mysql/create_database?name=$(& $enc $DbFullName)"
    $DbName = $dbResp.data.name
    if (-not $DbName) { $DbName = $DbFullName }

    Write-Host "Creating database user via cPanel API ..." -ForegroundColor Cyan
    $userResp = Invoke-UAPI "Mysql/create_user?name=$(& $enc $DbUserFullName)&password=$(& $enc $DbPass)"
    $DbUser = $userResp.data.name
    if (-not $DbUser) { $DbUser = $DbUserFullName }

    Write-Host "Granting privileges on '$DbName' to '$DbUser' ..." -ForegroundColor Cyan
    Invoke-UAPI "Mysql/set_privileges_on_database?user=$(& $enc $DbUser)&database=$(& $enc $DbName)&privileges=ALL" | Out-Null

    Write-Host "Created database '$DbName' and user '$DbUser'. Double-check these in cPanel > MySQL Databases if anything looks off." -ForegroundColor Green
} else {
    Write-Host "Create this first: cPanel > MySQL Databases." -ForegroundColor Yellow
    $DbName = Read-Host "DB name (e.g. ${CPanelUser}_hibrand)"
    $DbUser = Read-Host "DB username (e.g. ${CPanelUser}_hibrand)"
    $DbPass = Read-PlainSecret "DB password"
}

Write-Host "`n== Admin panel ==" -ForegroundColor Cyan
$AdminPassword = Read-PlainSecret "New admin password (replaces the 'hibrands' default)"

# ---------------------------------------------------------------------------
# 2. Local build
# ---------------------------------------------------------------------------
Write-Host "`n== Building frontend ==" -ForegroundColor Cyan
Push-Location $frontend
npm install
npm run build
Pop-Location

Write-Host "`n== Generating a fresh APP_KEY locally ==" -ForegroundColor Cyan
Push-Location $backend
$AppKey = (php artisan key:generate --show).Trim()
Pop-Location
if (-not $AppKey.StartsWith('base64:')) { throw "Could not generate APP_KEY (got: '$AppKey')" }

# ---------------------------------------------------------------------------
# 3. Stage files
# ---------------------------------------------------------------------------
Write-Host "`n== Staging files for upload ==" -ForegroundColor Cyan
if (Test-Path $stage) { Remove-Item $stage -Recurse -Force }
New-Item -ItemType Directory -Path $stage | Out-Null

$stageApp = Join-Path $stage 'app'
robocopy $backend $stageApp /E /XD node_modules .git tests /XF ".env" "*.sqlite" | Out-Null

# Determine where the merged web root (Laravel public + React dist) lives
if ($UseCustomDocRoot) {
    $webroot = Join-Path $stageApp 'public'
    $migrateRequirePrefix = ''   # _migrate.php sits next to index.php, same as Laravel's own front controller
} else {
    $webroot = Join-Path $stage 'public_html'
    New-Item -ItemType Directory -Path $webroot | Out-Null
    Copy-Item (Join-Path $stageApp 'public\*') $webroot -Recurse -Force
    # Patch index.php to point one level up into $RemoteAppDir instead of the local app/ copy
    $indexPhp = Join-Path $webroot 'index.php'
    (Get-Content $indexPhp -Raw) `
        -replace "require __DIR__\.'/\.\./vendor/autoload\.php';", "require __DIR__.'/../$RemoteAppDir/vendor/autoload.php';" `
        -replace "require_once __DIR__\.'/\.\./bootstrap/app\.php';", "require_once __DIR__.'/../$RemoteAppDir/bootstrap/app.php';" |
        Set-Content $indexPhp -NoNewline
    $migrateRequirePrefix = "$RemoteAppDir/"
}

# Merge the React build into the web root
Copy-Item (Join-Path $frontend 'dist\*') $webroot -Recurse -Force

# Custom .htaccess: /api/* -> Laravel, everything else -> static file or SPA fallback
@"
<IfModule mod_rewrite.c>
    RewriteEngine On

    RewriteCond %{HTTPS} off
    RewriteRule ^ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]

    RewriteCond %{REQUEST_URI} ^/api/
    RewriteRule ^ index.php [L]

    RewriteCond %{REQUEST_FILENAME} !-f
    RewriteCond %{REQUEST_FILENAME} !-d
    RewriteRule ^ index.html [L]
</IfModule>

DirectoryIndex index.html
"@ | Set-Content (Join-Path $webroot '.htaccess') -NoNewline

# One-time, token-protected migration trigger (deleted right after use)
$migrateToken = [System.Guid]::NewGuid().ToString('N')
@"
<?php
if ((`$_GET['token'] ?? '') !== '$migrateToken') { http_response_code(404); exit('Not found'); }
require __DIR__.'/../${migrateRequirePrefix}vendor/autoload.php';
`$app = require_once __DIR__.'/../${migrateRequirePrefix}bootstrap/app.php';
`$kernel = `$app->make(Illuminate\Contracts\Console\Kernel::class);
`$kernel->bootstrap();
`$status = Illuminate\Support\Facades\Artisan::call('migrate', ['--force' => true]);
header('Content-Type: text/plain');
echo Illuminate\Support\Facades\Artisan::output();
"@ | Set-Content (Join-Path $webroot '_migrate.php') -NoNewline

# Production .env
@"
APP_NAME="H.I. Brands"
APP_ENV=production
APP_KEY=$AppKey
APP_DEBUG=false
APP_URL=https://$Domain

DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=$DbName
DB_USERNAME=$DbUser
DB_PASSWORD=$DbPass

SESSION_DRIVER=database
SESSION_LIFETIME=120
CACHE_STORE=database
QUEUE_CONNECTION=database

ADMIN_PASSWORD=$AdminPassword
"@ | Set-Content (Join-Path $stageApp '.env') -NoNewline

# ---------------------------------------------------------------------------
# 4. Zip locally, upload one archive per side, unzip remotely over SSH.
#    (Uploading vendor/'s thousands of small files one-by-one over SFTP is
#    extremely slow -- one archive upload + one remote unzip is far faster.)
# ---------------------------------------------------------------------------
if (-not (Get-Module -ListAvailable -Name Posh-SSH)) {
    Write-Host "`n== Installing Posh-SSH module (one-time) ==" -ForegroundColor Cyan
    Install-Module -Name Posh-SSH -Scope CurrentUser -Force
}
Import-Module Posh-SSH

Write-Host "`n== Compressing files for upload ==" -ForegroundColor Cyan
$appZip = Join-Path $stage 'app.zip'
Compress-Archive -Path (Join-Path $stageApp '*') -DestinationPath $appZip -Force
if (-not $UseCustomDocRoot) {
    $webZip = Join-Path $stage 'web.zip'
    Compress-Archive -Path (Join-Path $webroot '*') -DestinationPath $webZip -Force
}

$remoteHome = "/home/$CPanelUser"
$connParams = @{
    ComputerName = $CPanelHostName
    Port         = $SftpPort
    Credential   = $CPanelCred
    AcceptKey    = $true
    ErrorAction  = 'Stop'
}
if ($UseKeyAuth) { $connParams['KeyFile'] = $KeyFilePath }

Write-Host "`n== Connecting over SFTP to $CPanelHostName ==" -ForegroundColor Cyan
$sftp = New-SFTPSession @connParams

Write-Host "Uploading app.zip ..." -ForegroundColor Cyan
Set-SFTPItem -SFTPSession $sftp -Path $appZip -Destination $remoteHome -Force | Out-Null
if (-not $UseCustomDocRoot) {
    Write-Host "Uploading web.zip ..." -ForegroundColor Cyan
    Set-SFTPItem -SFTPSession $sftp -Path $webZip -Destination $remoteHome -Force | Out-Null
}
Remove-SFTPSession -SFTPSession $sftp | Out-Null

Write-Host "`n== Extracting on the server over SSH ==" -ForegroundColor Cyan
$ssh = New-SSHSession @connParams

function Invoke-Remote([string]$cmd) {
    $r = Invoke-SSHCommand -SSHSession $ssh -Command $cmd -TimeOut 300
    if ($r.Output) { Write-Host $r.Output }
    if ($r.ExitStatus -ne 0) { throw "Remote command failed (exit $($r.ExitStatus)): $cmd" }
}

Invoke-Remote "mkdir -p ~/$RemoteAppDir && unzip -o -q ~/app.zip -d ~/$RemoteAppDir && rm ~/app.zip"
if (-not $UseCustomDocRoot) {
    Invoke-Remote "mkdir -p ~/public_html && unzip -o -q ~/web.zip -d ~/public_html && rm ~/web.zip"
}

# ---------------------------------------------------------------------------
# 5. Run migrations, then remove the trigger script
# ---------------------------------------------------------------------------
Write-Host "`n== Running migrations ==" -ForegroundColor Cyan
Start-Sleep -Seconds 2
try {
    $resp = Invoke-WebRequest -Uri "https://$Domain/_migrate.php?token=$migrateToken" -UseBasicParsing
    Write-Host $resp.Content
} catch {
    Write-Host "Could not reach the migration endpoint yet: $($_.Exception.Message)" -ForegroundColor Yellow
    Write-Host "DNS may still be propagating, or SSL isn't issued yet. Run this once it's live:" -ForegroundColor Yellow
    Write-Host "  Invoke-WebRequest https://$Domain/_migrate.php?token=$migrateToken" -ForegroundColor Yellow
    Write-Host "Then delete _migrate.php from the server yourself." -ForegroundColor Yellow
}

$remoteMigratePath = if ($UseCustomDocRoot) { "~/$RemoteAppDir/public/_migrate.php" } else { '~/public_html/_migrate.php' }
Invoke-Remote "rm -f $remoteMigratePath"
Write-Host "Removed one-time migration script from the server." -ForegroundColor Green

Remove-SSHSession -SSHSession $ssh | Out-Null
Remove-Item $stage -Recurse -Force

Write-Host "`nDone. Visit https://$Domain to check the site, and https://$Domain/api/products for the API." -ForegroundColor Green
