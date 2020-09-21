<?php

namespace App\Exceptions;

use App\Exceptions\BaseException;
use Exception;
use Throwable;

class ValidatorReportException extends BaseException
{
    /*public function __construct($message = "", $code = 0, Throwable $previous = null)
    {
        parent::__construct($message, $code, $previous);
        $this->message = json_decode($message);
    }*/

    public function report()
    {

    }

    public function respond_for_api()
    {
        return response()->json(["errors" => json_decode($this->message)], 422);
    }

    public function render()
    {
        return response()->json(["errors" => json_decode($this->message)], 422);
    }
}
