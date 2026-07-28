<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class ProductController extends Controller
{
    public function index()
    {
        return response()->json(Product::orderBy('created_at', 'desc')->get());
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'brand'       => 'required|string|max:120',
            'name_en'     => 'required|string|max:200',
            'name_ar'     => 'nullable|string|max:200',
            'price'       => 'required|numeric|min:0',
            'category'    => 'required|in:Outerwear,Shirts,Knitwear,T-Shirts,Trousers',
            'image_ratio' => 'required|in:3/4,4/5,1/1,16/10',
            'featured'    => 'boolean',
        ]);

        $data['name_ar'] = $data['name_ar'] ?? $data['name_en'];
        $product = Product::create($data);

        return response()->json($product, 201);
    }

    public function update(Request $request, Product $product)
    {
        $data = $request->validate([
            'brand'       => 'sometimes|required|string|max:120',
            'name_en'     => 'sometimes|required|string|max:200',
            'name_ar'     => 'nullable|string|max:200',
            'price'       => 'sometimes|required|numeric|min:0',
            'category'    => 'sometimes|required|in:Outerwear,Shirts,Knitwear,T-Shirts,Trousers',
            'image_ratio' => 'sometimes|required|in:3/4,4/5,1/1,16/10',
            'featured'    => 'boolean',
        ]);

        $product->update($data);

        return response()->json($product);
    }

    public function destroy(Product $product)
    {
        if ($product->image_path) {
            Storage::disk('public')->delete($product->image_path);
        }
        $product->delete();
        return response()->json(['deleted' => true]);
    }

    public function uploadImage(Request $request, Product $product)
    {
        $request->validate([
            'image' => 'required|image|mimes:jpg,jpeg,png,webp|max:4096',
        ]);

        if ($product->image_path) {
            Storage::disk('public')->delete($product->image_path);
        }

        $filename = Str::random(20).'.'.$request->file('image')->extension();
        $storedPath = $request->file('image')->storeAs('products', $filename, 'public');

        $product->update(['image_path' => $storedPath]);

        return response()->json($product);
    }
}
