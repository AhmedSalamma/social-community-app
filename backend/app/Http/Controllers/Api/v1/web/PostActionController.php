<?php

namespace App\Http\Controllers\Api\v1\web;

use App\Events\PostCommented;
use App\Events\PostLiked;
use App\Http\Controllers\Controller;
use App\Models\Post;
use App\Models\Dislike;
use Illuminate\Http\Request;

class PostActionController extends Controller
{
    
    public function like(Post $post)
    {
        $user = request()->user();

        $like = $post->likes()
            ->where('user_id', $user->id)
            ->first();

        if ($like) {
            
            $like->delete();

            return response()->json([
                'status' => true,
                'message' => 'Unliked'
            ], 200);
        }

        $post->likes()->create([
            'user_id' => $user->id,
        ]);

        broadcast(new PostLiked($post->user, $post,'like',$user->name . " عجب بمنشورك"));

        return response()->json([
            'status' => true,
            'message' => 'Liked'
        ], 201);
    }

 

    public function comment(Post $post,  Request $request)
    {

        $request->validate([
         'content' => 'required|string|max:1000',
        ], [
            'content.required' => 'المحتوى مطلوب يا باشا',
            'content.string' => 'المحتوى لازم يكون نص',
            'content.max' => 'المحتوى طويل جداً (أقصى 1000 حرف)',
        ]);
        $user = request()->user();
        $comment = $post->comments()->create([
            'user_id' => $user->id,
            'content' =>   $request->content,
        ]);

        broadcast(new PostCommented($post->user, $post,'like',$user->name . "علق على منشورك"));

        return response()->json([
            'status' => true,
            'message' => 'تم إرسال تعليقك بنجاح',
            'data'=>$comment
        ], 201);
    }

    public function save(Post $post)
    {
        $user = request()->user();

        $saved = $post->saves()
            ->where('user_id', $user->id)
            ->first();

        if ($saved) {
            $saved->delete();

            return response()->json([
                'status' => true,
                'message' => 'Removed from saved'
            ], 200);
        }

        $post->saves()->create([
            'user_id' => $user->id
        ]);

        return response()->json([
            'status' => true,
            'message' => 'Saved successfully'
        ], 201);
    }

    
    public function share(Post $post)
    {
        $user = request()->user();

        $share = $post->shares()
            ->where('user_id', $user->id)
            ->first();

        if ($share) {
            $share->delete();

            return response()->json([
                'status' => true,
                'message' => 'Unshared successfully'
            ], 200);
        }

        $post->shares()->create([
            'user_id' => $user->id
        ]);

        return response()->json([
            'status' => true,
            'message' => 'Shared successfully'
        ], 201);
    }
}
