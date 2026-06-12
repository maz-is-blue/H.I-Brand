<?php

use App\Http\Controllers\AdminAuthController;
use App\Http\Controllers\ProductController;
use App\Http\Middleware\AdminAuth;
use Illuminate\Support\Facades\Route;

// Public
Route::get('/products', [ProductController::class, 'index']);
Route::post('/admin/login', [AdminAuthController::class, 'login']);

// Protected by admin token
Route::middleware(AdminAuth::class)->group(function () {
    Route::post('/products',           [ProductController::class, 'store']);
    Route::put('/products/{product}',  [ProductController::class, 'update']);
    Route::delete('/products/{product}', [ProductController::class, 'destroy']);
    Route::post('/admin/logout',       [AdminAuthController::class, 'logout']);
});
