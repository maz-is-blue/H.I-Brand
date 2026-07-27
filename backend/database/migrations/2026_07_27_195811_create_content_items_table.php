<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('content_items', function (Blueprint $table) {
            $table->id();
            $table->string('key', 150)->unique();
            $table->string('label');
            $table->enum('type', ['text', 'image', 'setting']);
            $table->text('value_en')->nullable();
            $table->text('value_ar')->nullable();
            $table->string('alt_en')->nullable();
            $table->string('alt_ar')->nullable();
            $table->string('image_path')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('content_items');
    }
};
