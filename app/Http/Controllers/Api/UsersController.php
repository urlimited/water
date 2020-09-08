<?php

namespace App\Http\Controllers\Api;

use App\Enums\ReportStatus;
use App\Exceptions\ValidatorReportException;
use App\Http\Controllers\Auth\RegisterController;
use App\Http\Controllers\Controller;
use App\Models\Users\User;
use App\Models\Users\UserManager;
use Illuminate\Auth\Access\AuthorizationException;
use Illuminate\Contracts\Routing\ResponseFactory;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cookie;


class UsersController extends Controller
{

    protected $app_user_manager;

    public function __construct()
    {
        $this->app_user_manager = app()->make(UserManager::class);
    }


    /**
     * @param Request $request
     * @return ResponseFactory|JsonResponse|Response
     * @throws ValidatorReportException
     */
    public function register(Request $request)
    {
        $customer = $this->app_user_manager->createCustomer($request->all());

        return response()
            ->json(["customer" => $customer], 200);
    }

    public function login(Request $request)
    {
        $user = $this->app_user_manager->auth($request->all());

        return response()
            ->json(["user" => collect($user)/*->except(["access_token"])*/], 200)
            ->withCookie(cookie('access_token', $user['access_token'], 30 * 24 * 60));
    }

    public function logout(Request $request)
    {
        $cookies = Cookie::forget('access_token');

        return response()
            ->json(["user" => ""], 200)
            ->withCookie($cookies);
    }

    public function getUser(Request $request)
    {
        $user = $this->app_user_manager->getUser();

        return response()
            ->json(["user" => collect($user)->except(["access_token"])], 200);
    }

    public function createCourier(Request $request)
    {
        $courier = null;

        if ($this->authorize('create-courier'))
            $courier = $this->app_user_manager->createCourier($request->all());

        return response()
            ->json(["courier" => $courier], 200);
    }

    /**
     * @param Request $request
     * @return JsonResponse
     * @throws ValidatorReportException
     * @throws AuthorizationException
     */
    public function createCustomer(Request $request){
        if ($this->authorize('create-customer'))
            $customer = $this->app_user_manager->createCustomer($request->all());

        return response()
            ->json(["customer" => $customer], 200);
    }

    public function getCouriers(Request $request)
    {
        $couriers = $this->app_user_manager->getCouriers();

        return response()
            ->json(["couriers" => $couriers], 200);
    }

    /**
     * @param Request $request
     * @return JsonResponse
     */
    public function getCouriersInventory(Request $request){
        $couriers = $this->app_user_manager->getCouriersWithProductsAt($request->all());

        return response()
            ->json(["couriers" => $couriers], 200);
    }

    public function getCouriersCash(Request $request){
        $couriers = $this->app_user_manager->getCouriersWithCash($request->all());

        return response()
            ->json(["couriers" => $couriers], 200);
    }

    public function setInventoryReportSuccessStatus(Request $request){
        $processed_data = $request->all();

        $processed_data['status'] = ReportStatus::SUCCESS;

        $report = $this->app_user_manager->setInventoryReportStatus($processed_data);

        return response()
            ->json(["report" => $report], 200);
    }

    public function setInventoryReportFailStatus(Request $request){
        $processed_data = $request->all();

        $processed_data['status'] = ReportStatus::PROBLEM;

        $report = $this->app_user_manager->setInventoryReportStatus($processed_data);

        return response()
            ->json(["report" => $report], 200);
    }

    public function setCashReportSuccessStatus(Request $request){
        $processed_data = $request->all();

        $processed_data['status'] = ReportStatus::SUCCESS;

        $report = $this->app_user_manager->setCashReportStatus($processed_data);

        return response()
            ->json(["report" => $report], 200);
    }

    public function setCashReportFailStatus(Request $request){
        $processed_data = $request->all();

        $processed_data['status'] = ReportStatus::PROBLEM;

        $report = $this->app_user_manager->setCashReportStatus($processed_data);

        return response()
            ->json(["report" => $report], 200);
    }

    public function assignProductsToCourier(Request $request){
        $products = $this->app_user_manager->assignProductsToCourier($request->all());

        return response()
            ->json(["products" => $products], 200);
    }

    public function setCashToCourier(Request $request){
        $cash = $this->app_user_manager->setCashToCourier($request->all());

        return response()
            ->json(["cash" => $cash], 200);
    }

    public function getCustomers(Request $request)
    {
        $customers = $this->app_user_manager->getCustomers();

        return response()
            ->json(["customers" => $customers], 200);
    }
}
