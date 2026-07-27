<?php

namespace App\Http\Controllers;

use App\Models\ContentItem;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class ContentController extends Controller
{
    public function index()
    {
        return response()->json(
            ContentItem::all()->keyBy('key')->map(fn ($item) => [
                'label'      => $item->label,
                'type'       => $item->type,
                'value_en'   => $item->value_en,
                'value_ar'   => $item->value_ar,
                'alt_en'     => $item->alt_en,
                'alt_ar'     => $item->alt_ar,
                'image_path' => $item->image_path ? "/api/media/{$item->image_path}" : null,
            ])
        );
    }

    public function update(Request $request)
    {
        $data = $request->validate([
            'items'             => 'required|array',
            'items.*.key'       => 'required|string',
            'items.*.value_en'  => 'nullable|string',
            'items.*.value_ar'  => 'nullable|string',
        ]);

        foreach ($data['items'] as $row) {
            ContentItem::where('key', $row['key'])->update([
                'value_en' => $row['value_en'] ?? null,
                'value_ar' => $row['value_ar'] ?? null,
            ]);
        }

        return response()->json(['updated' => count($data['items'])]);
    }

    public function uploadImage(Request $request)
    {
        $data = $request->validate([
            'key'   => 'required|string|exists:content_items,key',
            'image' => 'required|image|mimes:jpg,jpeg,png,webp|max:4096',
        ]);

        $item = ContentItem::where('key', $data['key'])->firstOrFail();

        if ($item->image_path) {
            Storage::disk('public')->delete($item->image_path);
        }

        $filename = Str::random(20).'.'.$request->file('image')->extension();
        $storedPath = $request->file('image')->storeAs('content', $filename, 'public');

        $item->update(['image_path' => $storedPath]);

        return response()->json(['image_path' => "/api/media/{$storedPath}"]);
    }

    public function media(string $path)
    {
        abort_unless(Storage::disk('public')->exists($path), 404);

        return Storage::disk('public')->response($path, null, [
            'Cache-Control' => 'public, max-age=31536000, immutable',
        ]);
    }
}
