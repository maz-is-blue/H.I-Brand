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
        'subcategory',
        'sub_subcategory',
        'sizes',
        'colors',
        'image_ratio',
        'featured',
    ];

    protected $casts = [
        'price'    => 'float',
        'featured' => 'boolean',
        'sizes'    => 'array',
        'colors'   => 'array',
    ];

    protected $appends = ['image_url'];

    public function images()
    {
        return $this->hasMany(ProductImage::class)->orderBy('sort_order');
    }

    public function getImageUrlAttribute(): ?string
    {
        $first = $this->relationLoaded('images') ? $this->images->first() : $this->images()->first();
        return $first?->url;
    }
}
