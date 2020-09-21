<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::prefix('users')->group(function(){
    Route::post('/register', "Api\UsersController@register");
    Route::post('/login', "Api\UsersController@login");
    Route::post('/logout', "Api\UsersController@logout");

    Route::middleware('auth:api')->group(function(){
        Route::get('/get_user', "Api\UsersController@getUser");
    });
});

Route::middleware('auth:api')->group(function(){
    Route::prefix('products')->group(function(){
        Route::post('/create', "Api\ProductsController@createProduct");
        Route::put('/update', "Api\ProductsController@updateProduct");
        Route::delete('/delete', "Api\ProductsController@deleteProduct");
        Route::get('/get_products', "Api\ProductsController@getProducts");
    });

    Route::prefix('couriers')->group(function(){
        Route::post('/create', "Api\UsersController@createCourier");
        Route::get('/get_all', "Api\UsersController@getCouriers");
        Route::post('/set_products_at_beginning', "Api\UsersController@assignProductsToCourier");
        Route::get('/get_inventory_report', "Api\UsersController@getCouriersInventory");
        Route::put('/set_inventory_report_success', "Api\UsersController@setInventoryReportSuccessStatus");
        Route::put('/set_inventory_report_fail', "Api\UsersController@setInventoryReportFailStatus");
        Route::get('/get_cash_report', "Api\UsersController@getCouriersCash");
        Route::post('/set_cash_at_beginning', "Api\UsersController@setCashToCourier");
        Route::put('/set_cash_report_success', "Api\UsersController@setCashReportSuccessStatus");
        Route::put('/set_cash_report_fail', "Api\UsersController@setCashReportFailStatus");
    });

    Route::prefix('orders')->group(function(){
        Route::post('/create', 'Api\OrdersController@createOrder');
        Route::put('/update', 'Api\OrdersController@updateOrder');
        Route::get('/get_orders', 'Api\OrdersController@getOrders');
        Route::put('/set_success_order', 'Api\OrdersController@setOrderSuccess');
        Route::put('/set_failed_order', 'Api\OrdersController@setOrderFailed');
        Route::get('/problems', 'Api\OrdersController@getProblems');
    });

    Route::prefix('users')->group(function(){
        Route::post('/create_customer', 'Api\UsersController@createCustomer');
        Route::get('/get_customers', 'Api\UsersController@getCustomers');
    });
});
