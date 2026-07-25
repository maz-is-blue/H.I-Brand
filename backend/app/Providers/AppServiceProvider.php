<?php

namespace App\Providers;

use Illuminate\Support\Facades\Schema;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        // This server's MySQL doesn't support the full utf8mb4 index length
        // for varchar(255) columns ("max key length is 1000 bytes").
        Schema::defaultStringLength(191);
    }
}
