<?php

namespace App\Models\Products;

use App\Events\Products\ProductCreated;
use App\Exceptions\Users\CredentialsException;
use App\Exceptions\Users\InvalidApprovePhoneCodeException;
use App\Exceptions\ValidatorReportException;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class ProductsManager
{
    protected $products = [];

    /**
     * @param $data
     * @return Product
     * @throws ValidatorReportException
     */
    public function createProduct($data){
        $validator = Validator::make($data, [
            'name' => 'required|string',
            'price' => 'required|integer',
            'volume' => 'required|integer',
            'color' => 'required|string',
            'amount' => 'required|integer',
        ]);

        if ($validator->fails())
            throw new ValidatorReportException($validator->errors());

        $processed_data = [
            "name" => $data["name"],
            "volume" => $data["volume"],
            "price" => $data["price"],
            "icon_color" => $data["color"],
            "amount" => $data["amount"],
        ];

        $product = new Product();

        if(Auth::user()->can("create-product", Product::class))
            $product = Product::create($processed_data);

        event(new ProductCreated($product));

        return $product;
    }

    /**
     * @param $data
     * @return mixed
     * @throws ValidatorReportException
     */
    public function updateProduct($data){
        $validator = Validator::make($data, [
            'id' => 'required|integer|exists:products,id',
            'name' => 'required|string',
            'price' => 'required|integer',
            'volume' => 'required|integer',
            'color' => 'required|string',
            'amount' => 'required|integer',
        ]);

        if ($validator->fails())
            throw new ValidatorReportException($validator->errors());

        $processed_data = [
            "id" => $data["id"],
            "name" => $data["name"],
            "volume" => $data["volume"],
            "price" => $data["price"],
            "icon_color" => $data["color"],
            "amount" => $data["amount"],
        ];

        $product = Product::find($data['id']);

        $product->fill($processed_data);

        if(Auth::user()->can("update-product", $product))
            $product->save();

        event(new ProductCreated($product));

        return $product;
    }

    /**
     * @param $data
     * @return mixed
     * @throws ValidatorReportException
     */
    public function softDeleteProduct($data){
        $validator = Validator::make($data, [
            'id' => 'required|integer|exists:products,id',
        ]);

        if ($validator->fails())
            throw new ValidatorReportException($validator->errors());

        $product = Product::find($data['id']);

        $product->deleted_at = time();

        if(Auth::user()->can("delete-product", $product))
            $product->save();

        return $product;
    }

    /**
     * @param $data
     * @return Product[]|Collection
     */
    public function getAllProducts($data){
        return Product::where('deleted_at', '=', null)->get();
    }

    public function getUser(){
        return collect(Auth::user())->all();
    }
}