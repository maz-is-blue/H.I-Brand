<?php
if (($_GET['token'] ?? '') !== '8481b6c1e7ee4e3b891350a4e013e2f8') { http_response_code(404); exit('Not found'); }
require __DIR__.'/../hibrand_app/vendor/autoload.php';
$app = require_once __DIR__.'/../hibrand_app/bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();
$status = Illuminate\Support\Facades\Artisan::call('migrate', ['--force' => true]);
header('Content-Type: text/plain');
echo Illuminate\Support\Facades\Artisan::output();