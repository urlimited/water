<?php

namespace App\Policies;

use App\Models\Users\Customer;
use App\Models\Users\User;
use Illuminate\Auth\Access\HandlesAuthorization;
use App\Enums\UserRole;

class UserPolicy
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
    public function createCustomer(User $user)
    {
        return collect([UserRole::SELLER, UserRole::ADMIN])->contains($user->role_id);
    }
}
