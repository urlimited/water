<?php

namespace App\Http\Controllers\Api;

use App\Exceptions\ValidatorReportException;
use App\Http\Controllers\Controller;
use App\Models\Products\ProductsManager;
use Illuminate\Contracts\Routing\ResponseFactory;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;


class ProductsController extends Controller
{

    protected $app_products_manager;


    public function __construct()
    {
        $this->app_products_manager = app()->make(ProductsManager::class);
    }


    /**
     * @param Request $request
     * @return ResponseFactory|JsonResponse|Response
     */
    public function createProduct(Request $request)
    {
        $product = $this->app_products_manager->createProduct($request->all());

        return response()
            ->json(["product" => collect($product)], 200);
    }

    /**
     * @param Request $request
     * @return ResponseFactory|JsonResponse|Response
     */
    public function getProducts(Request $request)
    {
        $products = $this->app_products_manager->getAllProducts($request->all());

        return response()
            ->json(["products" => $products], 200);
    }

    /**
     * @param Request $request
     * @return JsonResponse
     * @throws ValidatorReportException
     */
    public function updateProduct(Request $request)
    {
        $product = $this->app_products_manager->updateProduct($request->all());

        return response()
            ->json(["product" => $product]);
    }

    /**
     * @param Request $request
     * @return JsonResponse
     * @throws ValidatorReportException
     */
    public function deleteProduct(Request $request){
        $product = $this->app_products_manager->softDeleteProduct($request->all());

        return response()
            ->json(["product" => $product]);
    }
}