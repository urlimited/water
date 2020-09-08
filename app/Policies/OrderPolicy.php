<?php

namespace App\Policies;

use App\Models\Users\User;
use Illuminate\Auth\Access\HandlesAuthorization;
use App\Enums\UserRole;

class OrderPolicy
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
        return collect([UserRole::SELLER, UserRole::ADMIN, UserRole::CUSTOMER])->contains($user->role_id);
    }

    public function update(User $user)
    {
        return collect([UserRole::SELLER, UserRole::ADMIN])->contains($user->role_id);
    }

    public function createWithCourier(User $user)
    {
        return collect([UserRole::SELLER, UserRole::ADMIN])->contains($user->role_id);
    }

    public function createWithCustomer(User $user)
    {
        return collect([UserRole::SELLER, UserRole::ADMIN])->contains($user->role_id);
    }
}
