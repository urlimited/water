<?php

namespace App\Models\Users;

use Carbon\Carbon;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Passport\HasApiTokens;

/**
 * @property User user
 */
class Customer extends Authenticatable
{
    use Notifiable, HasApiTokens;

    public $timestamps = false;

    protected $hidden = [
        "created_at", "email_verified_at", "password", "remember_token", "updated_at", "user_id", "user"
    ];

    protected $appends = [
        "name", "email", "role_id", "phone"
    ];

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'org_type', 'user_id', 'address'
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

    //----------------Relations

    public function user(){
        return $this->belongsTo("App\Models\Users\User", "user_id", "id");
    }

    //----------------Accessors

    public function getNameAttribute(){
        return $this->user->name;
    }

    public function getEmailAttribute(){
        return $this->user->email;
    }

    public function getRoleIdAttribute(){
        return $this->user->role_id;
    }

    public function getPhoneAttribute(){
        return $this->user->phone;
    }

}
