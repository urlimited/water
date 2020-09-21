<?php

namespace App\Policies;

use App\Models\Products\Product;
use App\Models\Users\Courier;
use App\Models\Users\User;
use Illuminate\Auth\Access\HandlesAuthorization;
use App\Enums\UserRole;

class CourierPolicy
{
    use HandlesAuthorization;

    /**
     * Create a new policy instance.
     *
     * @return void
     */
    public function __construct()
    {
        //
    }

    /**
     * @param User $user
     * @return bool
     */
    public function create(User $user)
    {
        return collect([UserRole::SELLER, UserRole::ADMIN])->contains($user->role_id);
    }

    public function update(User $user, Courier $courier)
    {
        return collect([UserRole::SELLER, UserRole::ADMIN])->contains($user->role_id);
    }

    public function delete(User $user, Courier $courier)
    {
        return collect([UserRole::SELLER, UserRole::ADMIN])->contains($user->role_id);
    }
}
