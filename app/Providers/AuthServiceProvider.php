<?php

namespace App\Providers;

use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;
use Illuminate\Support\Facades\Gate;
use Laravel\Passport\Passport;
use Carbon\Carbon;

class AuthServiceProvider extends ServiceProvider
{
    /**
     * The policy mappings for the application.
     *
     * @var array
     */
    protected $policies = [
        'App\Models\Products\Product' => 'App\Policies\ProductPolicy',
        'App\Models\Users\Courier' => 'App\Policies\CourierPolicy',
        'App\Models\Orders\Order' => 'App\Policies\OrderPolicy',
        'App\Models\Users\Customer' => 'App\Policies\UserPolicy',
    ];

    /**
     * Register any authentication / authorization services.
     *
     * @return void
     */
    public function boot()
    {
        $this->registerPolicies();

        Gate::define('create-product', 'App\Policies\ProductPolicy@create');
        Gate::define('update-product', 'App\Policies\ProductPolicy@update');
        Gate::define('delete-product', 'App\Policies\ProductPolicy@delete');
        Gate::define('create-courier', 'App\Policies\CourierPolicy@create');
        Gate::define('create-order', 'App\Policies\OrderPolicy@create');
        Gate::define('update-order', 'App\Policies\OrderPolicy@update');
        Gate::define('create-order-with-courier', 'App\Policies\OrderPolicy@createWithCourier');
        Gate::define('create-order-with-customer', 'App\Policies\OrderPolicy@createWithCustomer');
        Gate::define('create-customer', 'App\Policies\UserPolicy@createCustomer');

        Passport::routes();
        Passport::tokensExpireIn(Carbon::now()->addCentury());
        Passport::personalAccessClientId('1');
    }
}
