<?php

namespace App\Exceptions;

use App\Exceptions\Users\AuthenticationException;
use App\Exceptions\BaseException;
use App\Exceptions\Users\CredentialsException;
use App\Exceptions\Users\UserNotFoundException;
use Exception;
use Illuminate\Foundation\Exceptions\Handler as ExceptionHandler;
use Illuminate\Http\Request;
use Throwable;

class Handler extends ExceptionHandler
{
    /**
     * A list of the exception types that are not reported.
     *
     * @var array
     */
    protected $dontReport = [
        //
    ];

    /**
     * A list of the inputs that are never flashed for validation exceptions.
     *
     * @var array
     */
    protected $dontFlash = [
        'password',
        'password_confirmation',
    ];

    /**
     * Report or log an exception.
     *
     * @param Exception $exception
     * @return void
     * @throws Exception
     */
    public function report(Throwable $exception)
    {
        parent::report($exception);
    }

    /**
     * Render an exception into an HTTP response.
     *
     * @param Request $request
     * @param Throwable $exception
     * @return string
     * @throws Throwable
     */
    public function render($request,  Throwable $exception)
    {
        if ($exception instanceof \Illuminate\Auth\AuthenticationException && $request->expectsJson())
            return (new AuthenticationException)->respond_for_api();

        if ($exception instanceof ValidatorReportException)
            return $exception->render();

        if ($exception instanceof CredentialsException)
            return $exception->render();

        return parent::render($request, $exception);
    }
}
