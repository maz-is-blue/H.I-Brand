<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;

    protected $fillable = [
        'brand',
        'name_en',
        'name_ar',
        'price',
        'category',
        'image_ratio',
        'image_path',
        'featured',
    ];

    protected $casts = [
        'price'    => 'float',
        'featured' => 'boolean',
    ];

    protected $appends = ['image_url'];

    public function getImageUrlAttribute(): ?string
    {
        return $this->image_path ? "/api/media/{$this->image_path}" : null;
    }
}
