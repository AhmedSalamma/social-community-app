<?php

namespace App\Listeners;

use App\Events\PostLiked;
use App\Notifications\PostLikeNotification;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;

class SendLikeNotification
{
    /**
     * Create the event listener.
     */
    public function __construct()
    {
        //
    }

    /**
     * Handle the event.
     */
    public function handle(PostLiked $event): void
    {

    $event->user->notify(
                new PostLikeNotification(
                    $event->post,
                    $event->user,
                    $event->type,
                    $event->message,
                    $event->username
                )
            );
        
    }
}
