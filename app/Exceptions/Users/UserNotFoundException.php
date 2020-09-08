<?php

namespace App\Exceptions\Users;

use App\Interfaces\HTTPHandleable;
use Exception;
use Throwable;

class UserNotFoundException extends Exception
{
    public function report(){

    }

    public function respond_for_api()
    {
        return response()->json(["User not found"], 417);
    }

    public function render(){
        return response()->json(["User not found"], 417);
    }
}
