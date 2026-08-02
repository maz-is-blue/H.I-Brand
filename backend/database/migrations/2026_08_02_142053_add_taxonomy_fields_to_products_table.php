<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('products', function (Blueprint $table) {
            $table->string('subcategory')->nullable()->after('category');
            $table->string('sub_subcategory')->nullable()->after('subcategory');
            $table->json('sizes')->nullable()->after('sub_subcategory');
            $table->json('colors')->nullable()->after('sizes');
        });
    }

    public function down(): void
    {
        Schema::table('products', function (Blueprint $table) {
            $table->dropColumn(['subcategory', 'sub_subcategory', 'sizes', 'colors']);
        });
    }
};
