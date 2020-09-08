<?php

namespace App\Models\Users;

use App\Enums\OrderStatus;
use App\Enums\ReportStatus;
use App\Enums\UserRole;
use App\Exceptions\Users\CredentialsException;
use App\Exceptions\ValidatorReportException;
use App\Models\Products\Product;
use App\Models\Reports\CashReport;
use App\Models\Reports\InventoryReport;
use App\Models\Reports\InventoryReportProduct;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class UserManager
{
    protected $users = [];

    /**
     * @param $data
     * @return array
     * @throws CredentialsException
     */
    public function auth($data)
    {
        $username = "email";

        if (array_key_exists('phone', $data))
            $username = "phone";

        if (!Auth::attempt([$username => $data[$username], 'password' => $data['password']]))
            throw new CredentialsException();

        $user = User::where($username, "=", $data[$username])->first();

        $user->revokeAllTokens();

        $accessToken = $user->createToken("auth_session_token")->accessToken;
        $user->access_token = "Bearer " . $accessToken;

        return collect($user)->except(["tokens", "firebase_token"])->all();
    }

    /**
     * @param $data
     * @return Courier
     * @throws ValidatorReportException
     */
    public function createCourier($data)
    {
        $validator = Validator::make($data, [
            'phone' => 'required|string|unique:users,phone',
            'name' => 'required|string',
        ]);

        if ($validator->fails())
            throw new ValidatorReportException($validator->errors());

        $processed_data = [
            "name" => $data["name"],
            "phone" => $data["phone"],
            "email" => "courier" . $data['phone'] . "@armansu.kz",
            "password" => array_key_exists('password', $data) ? Hash::make($data['password']) : Hash::make("secret123"),
            "role_id" => 2
        ];

        $user = User::create($processed_data);

        $processed_data['user_id'] = $user->id;

        return Courier::create($processed_data);
    }

    /**
     * @param $data
     * @return mixed
     * @throws ValidatorReportException
     */
    public function createCustomer($data)
    {
        $validator = Validator::make($data, [
            'phone' => 'required|string|unique:users,phone',
            'email' => 'required|string|unique:users,email',
            'name' => 'required|string',
            'address' => 'string'
        ]);

        if ($validator->fails())
            throw new ValidatorReportException($validator->errors());

        $processed_data = [
            "address" => array_key_exists('address', $data)
                ? $data['address']
                : "",
            "name" => $data["name"],
            "phone" => $data["phone"],
            "email" => $data["email"],
            "org_type" => $data["org_type_id"],
            "password" => array_key_exists('password', $data)
                ? Hash::make($data['password'])
                : Hash::make("secret123"),
        ];

        $user = User::create($processed_data);

        $processed_data['user_id'] = $user->id;

        return Customer::create($processed_data);
    }

    public function getCouriers()
    {
        return Courier::select('couriers.*')->join('users', 'couriers.user_id', '=', 'users.id')->get();
    }

    /**
     * @param $data
     * @return Builder[]|Collection
     */
    public function getCouriersWithProductsAt($data)
    {
        return Courier::with('inventoryReports')
            ->get()
            ->map(function ($courier) {
                $courier->products_during_day = DB::table('order_products')
                    ->join('orders', 'orders.id', '=', 'order_products.order_id')
                    ->join('products', 'products.id', '=', 'order_products.product_id')
                    ->where('orders.courier_id', '=', $courier->id)
                    ->where('orders.delivery_date', '>=', Carbon::now()->startOfDay()->timestamp)
                    ->where('orders.delivery_date', '<', Carbon::now()->endOfDay()->timestamp)
                    ->where('orders.status', '=', OrderStatus::DELIVERED)
                    ->select('products.id as product_id', 'products.name as product_name', 'products.volume as product_volume', 'order_products.amount_ordered as amount_ordered')
                    ->get();

                $courier->inventory_report_id = $courier->inventoryReports ? $courier->inventoryReports->id : 0;

                return $courier;
            });
    }

    public function getCouriersWithCash($data)
    {
        return Courier::with('cashReports')
            ->get()
            ->map(function ($courier) {
                $courier->orders_during_day = DB::table('order_products')
                    ->join('orders', 'orders.id', '=', 'order_products.order_id')
                    ->where('orders.courier_id', '=', $courier->id)
                    ->where('orders.delivery_date', '>=', Carbon::now()->startOfDay()->timestamp)
                    ->where('orders.delivery_date', '<', Carbon::now()->endOfDay()->timestamp)
                    ->where('orders.status', '=', OrderStatus::DELIVERED)
                    ->select('orders.id as order_id', 'orders.address as order_address', 'order_products.amount_ordered as amount_ordered', 'order_products.price_ordered as price_ordered')
                    ->get();

                $courier->cash_report_id = $courier->cashReports ? $courier->cashReports->id : 0;

                return $courier;
            });
    }

    /**
     * @param $data
     * @return mixed
     * @throws ValidatorReportException
     */
    public function assignProductsToCourier($data)
    {
        $validator = Validator::make($data, [
            'cart' => 'required|string',
            'courier_id' => 'required|integer|exists:couriers,id',
            'status' => 'string',
        ]);

        if ($validator->fails())
            throw new ValidatorReportException($validator->errors());

        $processed_data = [
            "courier_id" => $data['courier_id'],
            "status" => $data['status'] ?? ReportStatus::BEGINNING,
            "cart" => json_decode($data['cart']),
            "reported_at" => time(),
        ];

        $old_reports = InventoryReport::where('courier_id', '=', $processed_data['courier_id'])
            ->where('reported_at', '>=', Carbon::now()->startOfDay()->timestamp)
            ->get();

        $old_reports->each(function ($report) {
            $report->delete();

            InventoryReportProduct::where('report_id', '=', $report->id)
                ->get()->each(function ($report_item) {
                    $report_item->delete();
                });
        });

        $inventoryReport = InventoryReport::create($processed_data);

        collect($processed_data['cart'])->each(function ($product) use ($inventoryReport) {
            InventoryReportProduct::create([
                'report_id' => $inventoryReport->id,
                'product_id' => $product->id,
                'amount' => $product->amount
            ]);
        });

        return $inventoryReport;
    }

    /**
     * @param $data
     * @return mixed
     * @throws ValidatorReportException
     */
    public function setInventoryReportStatus($data)
    {
        $validator = Validator::make($data, [
            'report_id' => 'required|integer|exists:courier_inventory_report,id',
            'status' => 'required|string',
        ]);

        if ($validator->fails())
            throw new ValidatorReportException($validator->errors());

        $processed_data = [
            "report_id" => $data['report_id'],
            "status" => $data['status'],
        ];

        $report = InventoryReport::find($processed_data['report_id']);

        $report->status = $processed_data['status'];

        $report->save();

        return $report;
    }

    /**
     * @param $data
     * @return mixed
     * @throws ValidatorReportException
     */
    public function setCashReportStatus($data)
    {
        $validator = Validator::make($data, [
            'report_id' => 'required|integer|exists:couriers_cash_report,id',
            'status' => 'required|string',
        ]);

        if ($validator->fails())
            throw new ValidatorReportException($validator->errors());

        $processed_data = [
            "report_id" => $data['report_id'],
            "status" => $data['status'],
        ];

        $report = CashReport::find($processed_data['report_id']);

        $report->status = $processed_data['status'];

        $report->save();

        return $report;
    }

    /**
     * @param $data
     * @throws ValidatorReportException
     */
    public function setCashToCourier($data)
    {
        $validator = Validator::make($data, [
            'courier_id' => 'required|integer|exists:couriers,id',
            'amount' => 'required|integer',
            'status' => 'string'
        ]);

        if ($validator->fails())
            throw new ValidatorReportException($validator->errors());

        $processed_data = [
            "courier_id" => $data['courier_id'],
            "cash_on_hand" => $data['amount'],
            "status" => array_key_exists('status', $data) ? $data['status'] : ReportStatus::BEGINNING,
            "reported_at" => time()
        ];

        CashReport::where('courier_id', '=', $processed_data['courier_id'])
            ->where('reported_at', '>=', Carbon::now()->startOfDay()->timestamp)
            ->get();

        return CashReport::create($processed_data);

    }

    public function getCustomers()
    {
        // select clause in order to do not overwrite customers.id with users.id
        return Customer::select('customers.*')->join('users', 'customers.user_id', '=', 'users.id')->get();
    }

    public function getUser()
    {
        if(Auth::user()->role_id === UserRole::CUSTOMER)
            return Customer::where('user_id', '=', Auth::user()->id)->first();

        return collect(Auth::user())->all();
    }
}