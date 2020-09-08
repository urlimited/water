<?php

namespace App\Exceptions\Users;

use Exception;
use Throwable;

class CredentialsException extends Exception
{
    public function report()
    {

    }

    public function respond_for_api()
    {

    }

    public function render(){
        return response()->json([
            "errors" => [
                "Unauthenticated" => ["Credentials are incorrect"]
            ]
        ], 401);
    }
}
