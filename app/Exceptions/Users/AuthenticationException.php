<?php

namespace App\Exceptions\Users;

use App\Interfaces\HTTPHandleable;
use Exception;
use Throwable;

class AuthenticationException extends Exception
{
    public function report()
    {

    }

    public function respond_for_api()
    {
        return response()->json([
            "errors" => [
                "Unauthenticated" => ["Access token is not correct"]
            ]
        ], 401);
    }

    public function render(){

    }

    /*public function render()
    {
        return response()->json([
            "errors" => [
                "Unauthenticated" => ["Неверный access token"]
            ]
        ], 401);
    }*/
}
