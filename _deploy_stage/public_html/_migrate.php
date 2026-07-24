<?php
if (($_GET['token'] ?? '') !== 'd4dae5de02fa42d3aa99468900ac80cc') { http_response_code(404); exit('Not found'); }
require __DIR__.'/../hibrand_app/vendor/autoload.php';
$app = require_once __DIR__.'/../hibrand_app/bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();
$status = Illuminate\Support\Facades\Artisan::call('migrate', ['--force' => true]);
header('Content-Type: text/plain');
echo Illuminate\Support\Facades\Artisan::output();