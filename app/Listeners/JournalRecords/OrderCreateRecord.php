<?php

namespace App\Listeners\JournalRecords;

use App\Enums\OrderOperationType;
use App\Events\Orders\OrderFormed;
use App\Models\Products\Product;

class OrderCreateRecord
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
     * @param  OrderFormed  $event
     * @return void
     */
    public function handle(OrderFormed $event)
    {
        $event->order->products
            ->each(function (Product $product) use ($event) {
                $product->recordToWarehouse(OrderOperationType::CREATED, $event->order->id, $product->pivot->amount_ordered);
            });;
    }
}
