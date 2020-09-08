<?php

namespace App\Listeners\JournalRecords;

use App\Enums\OrderOperationType;
use App\Events\Orders\OrderFormed;
use App\Events\Orders\OrderUpdated;
use App\Models\Products\Product;
use App\Models\Products\WarehouseRecord;

class OrderUpdateRecord
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
     * @param OrderUpdated $event
     * @return void
     * @throws \Exception
     */
    public function handle(OrderUpdated $event)
    {
        $event->order->products
            ->each(function (Product $product) use ($event) {
                $product->warehouseRecords()
                    ->where('order_id', '=', $event->order->id)
                    ->where(function ($query) {
                        $query->where('operation', '=', OrderOperationType::UPDATED)
                            ->orWhere('operation', '=', OrderOperationType::CREATED);
                    })
                    ->get()
                    ->each(function (WarehouseRecord $record, $key) {
                        $record->delete();
                    });
                $product->recordToWarehouse(OrderOperationType::UPDATED, $event->order->id, $product->pivot->amount_ordered);
            });
    }
}
