<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\Post;

class Like extends Model
{
    protected $fillable = [
        'user_id',
        'post_id',
    ];

    public function likeable()
    {
        return $this->morphTo();
    }

    public function post()
    {
        return $this->belongsTo(Post::class);
    }
}