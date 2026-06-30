<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class CommentResource extends JsonResource
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
            'content' => $this->content,
            'post_id' => $this->post_id,
            'post_title' => $this->post->title,
            'user' => [
                'id' => $this->user->id,
                'name' => $this->user->name,
                'avatar' => $this->user->image ?? null,
            ],
            'likes_count' => $this->whenCounted('likes', $this->likes_count, $this->likes->count()),
            'dislikes_count' => $this->whenCounted('dislikes', $this->dislikes_count, $this->dislikes->count()),
            'created_at' => $this->created_at->diffForHumans(),
        ];
    }
}
