<?php

namespace App\Http\Controllers\Api\v1\Auth;

use App\Events\UserRegistered;
use App\Http\Controllers\Controller;
use App\Http\Requests\LoginRequest;
use App\Http\Requests\RegisterRequest;
use App\Models\User;
use App\Traits\ResponseTrait;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    use ResponseTrait;

    public function login(LoginRequest $request)
    {
        $credentials = $request->validated();

        if (!Auth::attempt($credentials)) {
            return $this->respondError('بيانات الدخول غير صحيحة', 401);
        }

        $user = Auth::user();
        $token = $user->createToken('auth_token')->plainTextToken;

        return $this->respondSuccess([
            'user' => $user,
            'token' => $token,
        ], 'تم تسجيل الدخول بنجاح',200);
    }

    public function register(RegisterRequest $request)
    {
        $user = User::create([
            'name' => $request->name,
            'username' => $request->username,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);

        $token = $user->createToken('auth_token')->plainTextToken;

        UserRegistered::dispatch($user);

        return $this->respondSuccess([
            'user' => new \App\Http\Resources\UserResource($user),
            'token' => $token,
            'token_type' => 'Bearer',
        ], 'تم إنشاء الحساب بنجاح', 201);
    }
}
