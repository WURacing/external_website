<?php

namespace App\Http\Controllers\Auth;

use App\Models\User;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;
use App\Http\Requests\LoginRequest;
use App\Http\Requests\RegisterRequest;

class AuthController extends Controller
{
    public function login(LoginRequest $request)
    {
        $credentials = $request->validated();

        if (!Auth::attempt($credentials)) {
            throw ValidationException::withMessages([
                'email' => 'Invalid credentials',
            ]);
        }

        $user = $request->user();

        $token = $user->createToken('API Token')->plainTextToken;

        // JSON-API Spec Compliant Response
        return response()->json([
            'data' => [
                'type' => 'users',
                'id' => $user->id,
                'attributes' => [
                    'name' => $user->name,
                    'email' => $user->email,
                    'created_at' => $user->created_at->format('Y-m-d'),
                    'updated_at' => $user->updated_at->format('Y-m-d'),
                    'access_token' => $token,
                    'token_type' => 'Bearer',
                ],
            ],
        ]);
    }

    public function register(RegisterRequest $request)
    {
        $data = $request->validated();

        $data['password'] = Hash::make($data['password']);

        $user = User::create($data);

        $token = $user->createToken('API Token')->plainTextToken;

        // JSON-API Spec Compliant Response
        return response()->json([
          'data' => [
            'type' => 'users',
            'message' => 'User registered successfully',
          ]
        ], 201);
    }

    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();

        return response()->json([
            'data' => [
                'type' => 'users',
                'message' => 'User logged out successfully',
            ],
        ], 200);
    }

    public function me(Request $request)
    {
        $user = $request->user();

        // JSON-API Spec Compliant Response
        return response()->json([
            'data' => [
                'type' => 'users',
                'id' => $user->id,
                'attributes' => [
                    'name' => $user->name,
                    'email' => $user->email,
                    'created_at' => $user->created_at->format('Y-m-d'),
                    'updated_at' => $user->updated_at->format('Y-m-d'),
                ],
            ],
        ]);
    }
}
