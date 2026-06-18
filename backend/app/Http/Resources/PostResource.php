<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PostResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
{
    return [
        'id' => $this->id,
        'title' => $this->title,
        'image'=>$this->image,
        'content' => $this->content,
        'user_id' => $this->user_id,
        'community_id' => $this->community_id,

        'author' => $this->whenLoaded('user', function () {
            return [
                'id' => $this->user->id,
                'name' => $this->user->name,
            ];
        }),

        'likes_count' => $this->whenLoaded('likes', fn () => $this->likes->count()),

        'is_liked' => $this->whenLoaded('likes', function () {
            return $this->likes->contains('user_id', auth()->id());
        }),

        'comments_count' => $this->whenLoaded('comments', fn () => $this->comments->count()),

        'comments' => $this->whenLoaded('comments', function () {
            return $this->comments->map(function ($comment) {
                return [
                    'id' => $comment->id,
                    'user_id' => $comment->user_id,
                    'content' => $comment->content,
                    'user_name' => $comment->user?->name,
                    'created_at'=>$comment->created_at,
                    'likes_count' => $comment->likes->count(),
                    'disLike_count'=>$comment->dislikes->count(),
                    'parent_id'=>$comment->parent_id
                ];
            });
        }),

        'share_count' => $this->whenLoaded('shares', fn () => $this->shares->count()),

        'community_name' => $this->community?->name,

        'created_at' => $this->created_at?->toDateTimeString(),
        'updated_at' => $this->updated_at?->toDateTimeString(),
    ];
}
}
