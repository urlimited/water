<?php

namespace App\Exceptions\Users;

use App\Interfaces\HTTPHandleable;
use Exception;
use Throwable;

class InvalidApprovePhoneCodeException extends Exception
{
    public function report()
    {

    }

    public function respond_for_api()
    {
        return response()->json([
            "errors" => [
                "IncorrectVerificationCode" => ["Phone approve code is not correct"]
            ]
        ], 417);
    }

    public function render()
    {
        return response()->json([
            "errors" => [
                "IncorrectVerificationCode" => ["Phone approve code is not correct"]
            ]
        ], 417);
    }
}
