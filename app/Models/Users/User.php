<?php

namespace App\Models\Users;

use App\Enums\UserRole;
use App\Models\Orders\Order;
use App\Models\Users\AccessToken;
use Carbon\Carbon;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Passport\HasApiTokens;

/**
 * @property string name
 * @method static where(string $username, string $string, $username1)
 */
class User extends Authenticatable
{
    use Notifiable, HasApiTokens;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'email', 'password', 'phone', 'role_id'
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token',
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    protected $attributes = [
        'role_id' => UserRole::CUSTOMER,
    ];

    public function revokeAllTokens()
    {
        foreach ($this->tokens->where("revoked", 0)->all() as $token) {
            $token->revoke();
        }
    }

    public function getAccessToken()
    {
        return AccessToken::where('user_id', $this->id)->where('expires_at', '>', Carbon::now())
            ->orderBy('created_at', 'desc')->first()->convertToJWT();
    }

    // Should be abstract
    public function orders(){
        return Order::all();
    }
}
