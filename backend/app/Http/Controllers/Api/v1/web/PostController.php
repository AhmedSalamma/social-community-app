<?php

namespace App\Http\Controllers\Api\v1\web;

use App\Http\Controllers\Controller;
use App\Http\Requests\PostRequest;
use App\Http\Resources\PostResource;
use App\Models\Post;
use App\Traits\ResponseTrait;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cache;

class PostController extends Controller
{
    use ResponseTrait;

    public function index()
    {
        return PostResource::collection(Post::with(['user', 'likes', 'comments', 'shares', 'community'])->latest()->paginate(8));
    }

   public function store(PostRequest $request)
   {
        $data = $request->validated();

        if ($request->hasFile('image')) {
            $data['image'] = $request->file('image')
                ->store('posts', 'public');
        }

        $post = Auth::user()->posts()->create($data);

        return $this->respondSuccess(
            PostResource::make($post),
            'تم إرسال منشورك بنجاح',
            201
        );
    }

    public function show(int $post)
    {
        $post = Cache::remember("post_$post", 60, function () use ($post) {
            return Post::with([
                'user',
                'likes',
                'comments.user',
                'comments.likes',
                'comments.dislikes',
                'shares',
                'community',
            ])->findOrFail($post);
        });

        return $this->respondSuccess(
             PostResource::make($post),
            'تم جلب المنشور بنجاح',
            200
        );
    }

    public function getUserPosts()
    {

        $posts = Auth::user()->posts()
            ->with(['user', 'likes', 'comments', 'shares', 'community'])
            ->latest()
            ->paginate(10);

        return $this->respondSuccess(
            PostResource::collection($posts),
            'تم جلب منشوراتك بنجاح',
            200
        );
    }

    public function getUserComments()
    {
        $comments = Auth::user()->comments()
            ->with(['dislikes','likes'])
            ->latest()
            ->paginate(10);

         return $this->respondSuccess(
            PostResource::collection($comments),
            'تم جلب تعليقاتك بنجاح',
            200
        );
}

    public function destroy(int $id)
    {
        $post = Auth::user()->posts()->findOrFail($id);
        $post->delete();

        Cache::forget("post_$id");

        return $this->respondSuccess(
            null,
            'تم حذف المنشور بنجاح',
            200
        );
    }
}