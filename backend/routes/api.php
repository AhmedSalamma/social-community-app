<?php

use App\Http\Controllers\Api\v1\web\CommentActionController;
use App\Http\Controllers\Api\v1\web\CommunityController;
use App\Http\Controllers\Api\v1\web\PostActionController;
use App\Http\Controllers\Api\v1\web\PostController;
use App\Http\Controllers\Api\v1\web\UserController;
use App\Http\Controllers\Api\v1\Auth\AuthController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::post('login',[AuthController::class,'login']);
Route::post('register',[AuthController::class,'register']);

Route::controller(PostController::class)->middleware('auth:sanctum')->group(function () {
    Route::get('posts', 'index');
    Route::get('posts/user', 'getUserPosts');
    Route::get('posts/user/comments', 'getUserComments');

    Route::get('posts/{post}', 'show');
    Route::post('posts/add', 'store');
    Route::delete('posts/{post}', 'destroy');
});

Route::controller(PostActionController::class)->middleware('auth:sanctum')->group(function () {
    Route::post('posts/{post}/like', 'like');
    Route::post('posts/{post}/dislike', 'dislike');
    Route::post('posts/{post}/comment', 'comment');
    Route::post('posts/{post}/save', 'save');
    Route::post('posts/{post}/share', 'share');
});

Route::controller(CommentActionController::class)->middleware('auth:sanctum')->group(function () {
    Route::post('comments/{comment}/like', 'like');
    Route::post('comments/{comment}/dislike', 'dislike');
    Route::post('comments/{post}/reply', 'reply');
});

Route::controller(CommunityController::class)->middleware('auth:sanctum')->group(function () {
    Route::get('communities', 'index');
    Route::get('communities/user', 'myCommunities');
    Route::post('communities/add', 'store');
});

Route::controller(UserController::class)->middleware('auth:sanctum')->group(function () {
    Route::get('user/profile', 'profile');
    Route::put('user/profile', 'update');
});
