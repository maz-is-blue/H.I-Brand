<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ContentItem extends Model
{
    protected $fillable = [
        'key',
        'label',
        'type',
        'value_en',
        'value_ar',
        'alt_en',
        'alt_ar',
        'image_path',
    ];
}
