<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class NotificationResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id'         => $this->id,
            'type'       => $this->data['type'],
            'message'    => $this->data['message'],
            'user_name'  => $this->data['user_name'],
            'post_id'    => $this->data['post_id'],
            'post_title' => $this->data['post_title'],
            'read'       => !is_null($this->read_at),
            'created_at' => $this->created_at,
        ];
    }
}