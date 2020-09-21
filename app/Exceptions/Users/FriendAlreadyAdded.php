<?php

namespace App\Exceptions\Users;

use App\Interfaces\HTTPHandleable;
use Exception;
use Throwable;

class FriendAlreadyAdded extends Exception
{
    public function report(){

    }

    public function respond_for_api()
    {
        return response()->json([
            "errors" => [
                "FriendAlreadyAdded" => ["User is already in the friends list"]
            ]
        ], 417);
    }

    public function render(){
        return response()->json([
            "errors" => [
                "FriendAlreadyAdded" => ["User is already in the friends list"]
            ]
        ], 417);
    }
}
