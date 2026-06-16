<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\Dislike;
use App\Models\Like;

class Comment extends Model
{
   protected $fillable = ['content','user_id','parent_id','post_id'];


   public function post(){
    return $this->belongsTo(Post::class);
   }

    public function user(){
        return $this->belongsTo(User::class);
    }

    public function likes(){
         return $this->morphMany(Like::class, 'likeable');
    }

    public function dislikes(){
        return $this->morphMany(Dislike::class, 'dislikeable');
    }
}
