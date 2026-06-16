<?php

namespace App\Http\Controllers\Api\V1\Web;

use App\Http\Controllers\Controller;
use App\Models\Comment;
use App\Models\Dislike;
use App\Models\Post;
use Illuminate\Http\Request;

class CommentActionController extends Controller
{
     public function like(Comment $comment)
    {
        $user = request()->user();

        $like = $comment->likes()
            ->where('user_id', $user->id)
            ->first();

        if ($like) {
            
            $like->delete();

            return response()->json([
                'status' => true,
                'message' => 'تم إلغاء إعجابك'
            ], 200);
        }

        $comment->likes()->create([
            'user_id' => $user->id,
        ]);

        return response()->json([
            'status' => true,
            'message' => 'تم تسجيل الإعجاب'
        ], 201);
    }

      public function dislike(Comment $comment)
    {
        $user = request()->user();

        $dislike = $comment->dislikes()
            ->where('user_id', $user->id)
            ->first();

        if ($dislike) {
            
            $dislike->delete();

            return response()->json([
                'status' => true,
                'message' => 'Dislike removed'
            ], 200);
        }

        $comment->dislikes()->create([
            'user_id' => $user->id,
        ]);

        return response()->json([
            'status' => true,
            'message' => 'Disliked'
        ], 201);
    }

   public function reply(Post $post, Request $request)
   {
        $user = $request->user();

        $reply = $post->comments()->create([
            'user_id'=> $user->id,
            'content' => $request->content,
            'parent_id' => $request->parent_id,
        ]);

        return response()->json([
            'status' => true,
            'message' => 'Reply added successfully',
            'data' => $reply
        ], 201);
    }
}
