<?php

namespace App\Http\Controllers\Api\v1\web;

use App\Http\Controllers\Controller;
use App\Http\Requests\UserRequest;
use App\Http\Resources\CommentResource;
use App\Traits\ResponseTrait;
use Illuminate\Support\Facades\Hash;
use App\Http\Resources\UserResource;
use FileUplode;
use Illuminate\Support\Facades\Auth;

class UserController extends Controller
{
    use ResponseTrait;


    public function profile()
    {
        $user = Auth::user();

        return $this->respondSuccess(
            new UserResource($user),
            'تم جلب بيانات المستخدم بنجاح',
            200
        );      
    }

    public function update(UserRequest $request)
    {
        $user = Auth::user();
        $data = $request->validated();

       FileUplode::update($request->file('image'),$user->image,'users');

        if (isset($data['password'])) {
            $data['password'] = Hash::make($data['password']);
        }

        $user->update($data);

        return $this->respondSuccess(
            new UserResource($user),
            'تم تحديث بيانات المستخدم بنجاح',
            200
        );
    }

    public function getUserComments()
    {
       
        $user = Auth::user();

        $comments = $user->comments()
            ->with(['dislikes','likes'])
            ->latest()
            ->paginate(10);

       
            return CommentResource::collection($comments);
           
         
    }

    

}
