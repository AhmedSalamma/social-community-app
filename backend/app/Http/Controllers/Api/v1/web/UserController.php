<?php

namespace App\Http\Controllers\Api\v1\web;

use App\Http\Controllers\Controller;
use App\Http\Requests\UserRequest;
use App\Http\Resources\CommentResource;
use App\Traits\ResponseTrait;
use Illuminate\Support\Facades\Hash;
use App\Http\Resources\UserResource;
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

        if ($request->hasFile('image')) {
            $data['image'] = $request->file('image')->store('users', 'public');
        }

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
