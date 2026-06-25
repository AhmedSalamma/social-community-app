<?php

namespace App\Listeners;

use App\Events\PostCommented;
use App\Notifications\PostCommentedNotification;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;

class SendCommentNotification implements ShouldQueue
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
    public function handle(PostCommented $event): void
    {
        $event->user->notify(new PostCommentedNotification($event->post, $event->user ,$event->message, $event->username));
    }
}
