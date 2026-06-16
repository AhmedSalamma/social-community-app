<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

use App\Models\Save;
use App\Models\User;
use App\Models\Like;
use App\Models\Comment;
use App\Models\Dislike;
use App\Models\Share;
use App\Models\Community;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Post extends Model
{
    protected $fillable = ['title', 'content', 'community_id', 'image'];

    public function user()
    {
       return $this->belongsTo(User::class);
    }

    public function likes()
    {
        return $this->morphMany(Like::class, 'likeable');
    }
    public function dislikes()
    {
        return $this->morphMany(Dislike::class, 'dislikeable');
    }

    public function comments() {
        return $this->hasMany(Comment::class);
    }

    public function shares() {
        return $this->hasMany(Share::class);
    }

    public function community()
    {
        return $this->belongsTo(Community::class);
    }

  
}
