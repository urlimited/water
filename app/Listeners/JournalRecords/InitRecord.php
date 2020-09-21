<?php

namespace App\Listeners\JournalRecords;

use App\Enums\OrderOperationType;
use App\Events\Products\ProductCreated;

class InitRecord
{
    /**
     * Create the event listener.
     *
     * @return void
     */
    public function __construct()
    {
        //
    }

    /**
     * Handle the event.
     *
     * @param  ProductCreated  $event
     * @return void
     */
    public function handle(ProductCreated $event)
    {
        $event->product->recordToWarehouse(OrderOperationType::INIT, null, $event->product->amount);
    }
}
