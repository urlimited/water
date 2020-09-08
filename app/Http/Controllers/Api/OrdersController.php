<?php

namespace App\Http\Controllers\Api;

use App\Enums\OrderStatus;
use App\Exceptions\ValidatorReportException;
use App\Http\Controllers\Controller;
use App\Models\Orders\OrdersManager;
use App\Models\Products\ProductsManager;
use Illuminate\Auth\Access\AuthorizationException;
use Illuminate\Contracts\Routing\ResponseFactory;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;


class OrdersController extends Controller
{

    protected $app_products_manager;
    protected $app_orders_manager;


    public function __construct()
    {
        $this->app_products_manager = app()->make(ProductsManager::class);
        $this->app_orders_manager = app()->make(OrdersManager::class);
    }


    /**
     * @param Request $request
     * @return ResponseFactory|JsonResponse|Response
     * @throws AuthorizationException|ValidatorReportException
     */
    public function createOrder(Request $request)
    {
        if ($this->authorize('create-order'))
            $order = $this->app_orders_manager->createOrder($request->all());

        return response()
            ->json(["order" => $order], 200);
    }

    /**
     * @param Request $request
     * @return JsonResponse
     * @throws AuthorizationException|ValidatorReportException
     */
    public function updateOrder(Request $request)
    {
        if ($this->authorize('update-order'))
            $order = $this->app_orders_manager->updateOrder($request->all());

        return response()
            ->json(["order" => $order], 200);
    }

    /**
     * @param Request $request
     * @return JsonResponse
     */
    public function getOrders(Request $request)
    {
        $orders = $this->app_orders_manager->getOrders();

        return response()
            ->json(["orders" => $orders], 200);
    }

    /**
     * @param Request $request
     * @return JsonResponse
     * @throws ValidatorReportException
     */
    public function setOrderSuccess(Request $request)
    {
        $processed_data = $request->all();
        $processed_data['status'] = OrderStatus::DELIVERED;

        $order = $this->app_orders_manager->updateStatusOrder($processed_data);

        return response()
            ->json(["order" => $order], 200);
    }

    /**
     * @param Request $request
     * @return JsonResponse
     * @throws ValidatorReportException
     */
    public function setOrderFailed(Request $request)
    {
        $processed_data = $request->all();
        $processed_data['status'] = OrderStatus::NOT_DELIVERED;

        $order = $this->app_orders_manager->updateStatusOrder($processed_data);

        return response()
            ->json(["order" => $order], 200);
    }

    public function getProblems(Request $request)
    {
        $problems = $this->app_orders_manager->getProblems($request->all());

        return response()
            ->json(["problems" => $problems], 200);
    }
}