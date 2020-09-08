<?php

namespace App\Models\Orders;

use App\Enums\CourierStatus;
use App\Enums\OrderStatus;
use App\Enums\ReportStatus;
use App\Enums\UserRole;
use App\Events\Orders\OrderFormed;
use App\Events\Orders\OrderUpdated;
use App\Exceptions\ValidatorReportException;
use App\Models\Reports\CashReport;
use App\Models\Reports\InventoryReport;
use App\Models\Users\Courier;
use App\Models\Users\Customer;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class OrdersManager
{
    protected $products = [];

    /**
     * @param $data
     * @return array
     * @throws ValidatorReportException
     */
    public function createOrder($data)
    {
        $validator = Validator::make($data, [
            'cart' => 'required|string',
            'courier_id' => 'integer|exists:couriers,id',
            'delivery_date' => 'required|integer',
            'delivery_address' => 'required|string',
            'customer_id' => 'integer|exists:customers,id'
        ]);

        if ($validator->fails())
            throw new ValidatorReportException($validator->errors());

        $processed_data = [
            "cart" => json_decode($data["cart"], true),
            "delivery_date" => $data["delivery_date"],
            "customer_id" => $data["customer_id"] ?? null,
            "address" => $data["delivery_address"],
            "ordered_at" => time(),
            "courier_id" => $data['courier_id'] ?? null
        ];

        if (Auth::user()->cant("create-order-with-customer", Order::class))
            $processed_data['customer_id'] = Customer::where('user_id', '=', Auth::user()->id)->first()->id;

        if (Auth::user()->cant("create-order-with-courier", Order::class))
            $processed_data['courier_id'] = null;

        $order = Order::create($processed_data);

        // Products attaching
        foreach ($processed_data['cart'] as $product) {
            $order->products()->attach($product['id'], ['amount_ordered' => $product['amount'], 'price_ordered' => $product['price']]);
        }

        event(new OrderFormed($order));

        return $order;
    }


    /**
     * @param $data
     * @return array
     * @throws ValidatorReportException
     */
    public function updateOrder($data)
    {
        $validator = Validator::make($data, [
            'id' => 'required|integer|exists:orders,id',
            'cart' => 'required|string',
            'courier_id' => 'integer|exists:couriers,id',
            'delivery_date' => 'required|integer',
            'delivery_address' => 'required|string',
            'customer_id' => 'required|integer|exists:customers,id',
            'status' => 'required|integer',
        ]);

        if ($validator->fails())
            throw new ValidatorReportException($validator->errors());

        $processed_data = [
            "id" => $data['id'],
            "cart" => json_decode($data["cart"], true),
            "delivery_date" => $data["delivery_date"],
            "customer_id" => $data["customer_id"],
            "address" => $data["delivery_address"],
            "ordered_at" => time(),
            'courier_id' => $data['courier_id'],
            'status' => $data['status']
        ];

        $order = Order::find($processed_data['id'])->fill($processed_data);

        // Products detaching and attaching
        $order->products()->detach();

        foreach ($processed_data['cart'] as $product) {
            $order->products()->attach($product['id'], ['amount_ordered' => $product['amount'], 'price_ordered' => $product['price']]);
        }

        $order->save();

        event(new OrderUpdated($order));

        return $order;
    }

    /**
     * @param $data
     * @throws ValidatorReportException
     */
    public function updateStatusOrder($data)
    {
        $validator = Validator::make($data, [
            'order_id' => 'required|integer|exists:orders,id',
            'status' => 'required|integer',
        ]);

        if ($validator->fails())
            throw new ValidatorReportException($validator->errors());

        $processed_data = [
            'order_id' => $data['order_id'],
            'status' => $data['status']
        ];

        $order = Order::find($processed_data['order_id']);

        // TODO gate in order to success or fail only own orders

        $order->status = $processed_data['status'];
        $order->save();

        return $order;
    }

    /**
     * @return Order[]|Collection
     */
    public function getOrders()
    {
        $orders = [];

        // TODO: Weak point, should be polymorph
        // Auth::user()->orders;
        if (Auth::user()->role_id === UserRole::SELLER
            || Auth::user()->role_id === UserRole::ADMIN)
            $orders = Order::with('products')
                ->with('courier')
                ->with('customer')
                ->get();

        if (Auth::user()->role_id === UserRole::COURIER) {
            $courier_id = Courier::where('user_id', '=', Auth::user()->id)->first()->id;

            $orders = Order::with('products')
                ->where('courier_id', '=', $courier_id)
                ->where('status', '=', OrderStatus::IN_DELIVERY)
                ->get();
        }

        if (Auth::user()->role_id === UserRole::CUSTOMER) {
            $customer_id = Customer::where('user_id', '=', Auth::user()->id)->first()->id;

            $orders = Order::with('products')
                ->where('customer_id', '=', $customer_id)
                ->where('status', '=', OrderStatus::IN_DELIVERY)
                ->get()
                ->map(function ($order) {
                    $order->total_amount = $order->products->reduce(function ($accum, $next) {
                        return $accum + $next->pivot->amount_ordered * $next->pivot->price_ordered;
                    }, 0);

                    return $order;
                });
        }

        return $orders;
    }

    public function getProblems()
    {
        $cash_reports = CashReport::where('status', '=', ReportStatus::PROBLEM)
            ->with('courier')->get()
            ->map(function ($report) {
                $report->problem_type = "cash";
                return $report;
            });

        $inventory_reports = InventoryReport::where('status', '=', ReportStatus::PROBLEM)
            ->with('courier')->get()
            ->map(function ($report) {
                $report->problem_type = "inventory";
                return $report;
            });

        return $cash_reports->merge($inventory_reports);
    }

    private function allocateOrderToCourier($couriers, $date)
    {
        return collect($couriers)->reduce(function ($accum, $nextCourier) use ($date) {
            if ($nextCourier->ordersOnDate($date)->get()->reduce(function ($accum, $nextOrder) {
                    return $accum + $nextOrder->products->reduct(function ($accum, $nextProduct) {
                            return $accum + $nextProduct->volume;
                        }, 0);
                }, 0) < $accum)
                $accum = $nextCourier;

            return $accum;
        }, 10000);
    }
}