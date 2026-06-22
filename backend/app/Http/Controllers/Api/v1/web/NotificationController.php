<?php

namespace App\Http\Controllers\Api\v1\web;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class NotificationController extends Controller
{
    public function index()
    {
        $user = Auth::user();

        return response()->json([
            'status' => true,
            'notifications'=>$user->notifications,
            'unread' => $user->unreadNotifications,
            'read' => $user->readNotifications,
        ]);
    }
}