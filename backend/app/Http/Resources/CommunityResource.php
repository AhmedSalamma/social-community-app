<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class CommunityResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'desc' => $this->desc,
            'image' => $this->image ? asset('storage/' . $this->image) : $this->image,
            'posts_count' => $this->whenCounted('posts'),
            'users' => UserResource::collection(
                $this->whenLoaded('users')
            ),
            'users_count' => $this->whenCounted('users'),
            'created_at' => $this->created_at?->diffForHumans(),
        ];
    }
}
