<?php

namespace App\Listeners\JournalRecords;

use App\Enums\OrderOperationType;
use App\Events\Orders\OrderCancelled;
use App\Events\Orders\OrderFormed;
use App\Models\Products\Product;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;

class OrderCancelRecord
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
     * @param OrderCancelled $event
     * @return void
     */
    public function handle(OrderCancelled $event)
    {
        $event->order->products
            ->each(function (Product $product) use ($event) {
                $product->recordToWarehouse(OrderOperationType::CANCELLED, $event->order->id, $product->pivot->amount_ordered);
            });;
    }
}
