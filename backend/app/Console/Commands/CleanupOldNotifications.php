<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Laravel\Reverb\Loggers\Log;
use App\Models\Notification;
class CleanupOldNotifications extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'notifications:cleanup';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Delete read notifications older than a specified number of days';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $deleted = Notification::whereNotNull('read_at')
        ->where('created_at', '<', now()->subDays(30))
        ->delete();

        $this->info("Deleted {$deleted} old notifications.");
        Log::info("Notifications cleanup: {$deleted} records deleted.");
    }
}
