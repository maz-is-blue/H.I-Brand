<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Str;

class AdminAuthController extends Controller
{
    public function login(Request $request)
    {
        $request->validate(['password' => 'required|string']);

        $correct = config('app.admin_password', 'hibrands');

        if ($request->password !== $correct) {
            return response()->json(['message' => 'Incorrect password.'], 401);
        }

        $token = Str::random(64);
        Cache::put('admin_token_' . $token, true, now()->addHours(8));

        return response()->json(['token' => $token]);
    }

    public function logout(Request $request)
    {
        $token = $request->bearerToken();
        if ($token) {
            Cache::forget('admin_token_' . $token);
        }
        return response()->json(['logged_out' => true]);
    }
}
