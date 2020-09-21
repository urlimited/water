<?php

namespace App\Policies;

use App\Models\Products\Product;
use App\Models\Users\User;
use Illuminate\Auth\Access\HandlesAuthorization;
use App\Enums\UserRole;

class ProductPolicy
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

    public function update(User $user, Product $product)
    {
        return collect([UserRole::SELLER, UserRole::ADMIN])->contains($user->role_id);
    }

    public function delete(User $user, Product $product)
    {
        return collect([UserRole::SELLER, UserRole::ADMIN])->contains($user->role_id);
    }
}
