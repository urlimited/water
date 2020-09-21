<?php

namespace App\Providers;

use App\Events\Orders\OrderCancelled;
use App\Events\Orders\OrderFormed;
use App\Events\Orders\OrderUpdated;
use App\Events\Products\ProductCreated;
use App\Listeners\JournalRecords\InitRecord;
use App\Listeners\JournalRecords\OrderCancelRecord;
use App\Listeners\JournalRecords\OrderCreateRecord;
use App\Listeners\JournalRecords\OrderUpdateRecord;
use Illuminate\Auth\Events\Registered;
use Illuminate\Auth\Listeners\SendEmailVerificationNotification;
use Illuminate\Foundation\Support\Providers\EventServiceProvider as ServiceProvider;

class EventServiceProvider extends ServiceProvider
{
    /**
     * The event listener mappings for the application.
     *
     * @var array
     */
    protected $listen = [
        Registered::class => [
            SendEmailVerificationNotification::class,
        ],

        OrderFormed::class => [
            OrderCreateRecord::class,
        ],

        OrderUpdated::class => [
            OrderUpdateRecord::class,
        ],

        OrderCancelled::class => [
            OrderCancelRecord::class,
        ],

        ProductCreated::class => [
            InitRecord::class
        ]
    ];

    /**
     * Register any events for your application.
     *
     * @return void
     */
    public function boot()
    {
        parent::boot();

        //
    }
}
