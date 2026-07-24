<?php

namespace Database\Seeders;

use App\Models\Product;
use Illuminate\Database\Seeder;

class ProductSeeder extends Seeder
{
    public function run(): void
    {
        $products = [
            ['brand' => 'Hugo Boss',         'name_en' => 'Wool Overcoat',       'name_ar' => 'معطف صوف',       'price' => 120, 'category' => 'Outerwear', 'image_ratio' => '3/4',   'featured' => true],
            ['brand' => 'Tommy Hilfiger',    'name_en' => 'Oxford Shirt',         'name_ar' => 'قميص أوكسفورد', 'price' => 45,  'category' => 'Shirts',    'image_ratio' => '4/5',   'featured' => true],
            ['brand' => 'Polo Ralph Lauren', 'name_en' => 'Merino Knit Polo',     'name_ar' => 'بولو محبوك',    'price' => 55,  'category' => 'Knitwear',  'image_ratio' => '1/1',   'featured' => true],
            ['brand' => 'Zara',              'name_en' => 'Structured Blazer',    'name_ar' => 'بليزر مفصّل',  'price' => 80,  'category' => 'Outerwear', 'image_ratio' => '3/4',   'featured' => true],
            ['brand' => 'Lacoste',           'name_en' => 'Piqué Tee',           'name_ar' => 'تي شيرت بيكيه', 'price' => 40,  'category' => 'T-Shirts',  'image_ratio' => '4/5',   'featured' => false],
            ['brand' => 'Calvin Klein',      'name_en' => 'Denim Jacket',         'name_ar' => 'جاكيت جينز',    'price' => 70,  'category' => 'Outerwear', 'image_ratio' => '1/1',   'featured' => false],
            ['brand' => 'Tommy Hilfiger',    'name_en' => 'Tailored Chinos',      'name_ar' => 'بنطال تشينو',   'price' => 50,  'category' => 'Trousers',  'image_ratio' => '4/5',   'featured' => false],
            ['brand' => 'Zara',              'name_en' => 'Oversized Hoodie',     'name_ar' => 'هودي واسع',     'price' => 38,  'category' => 'Knitwear',  'image_ratio' => '3/4',   'featured' => false],
            ['brand' => 'Armani Exchange',   'name_en' => 'Logo Crew Tee',        'name_ar' => 'تي شيرت بشعار', 'price' => 42,  'category' => 'T-Shirts',  'image_ratio' => '1/1',   'featured' => false],
            ['brand' => 'Massimo Dutti',     'name_en' => 'Linen Shirt',          'name_ar' => 'قميص كتان',     'price' => 58,  'category' => 'Shirts',    'image_ratio' => '3/4',   'featured' => true],
            ['brand' => 'Hugo Boss',         'name_en' => 'Slim Trousers',        'name_ar' => 'بنطال سليم',    'price' => 65,  'category' => 'Trousers',  'image_ratio' => '4/5',   'featured' => false],
            ['brand' => 'Guess',             'name_en' => 'Cable Knit Sweater',   'name_ar' => 'سترة محبوكة',   'price' => 60,  'category' => 'Knitwear',  'image_ratio' => '1/1',   'featured' => false],
        ];

        foreach ($products as $p) {
            Product::create($p);
        }
    }
}
