<?php

namespace App\Models\Users;

use App\Enums\CourierStatus;
use App\Enums\ReportStatus;
use App\Models\Reports\CashReport;
use App\Models\Reports\InventoryReport;
use Carbon\Carbon;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Passport\HasApiTokens;

/**
 * @method static create(array $array)
 */
class Courier extends Authenticatable
{
    use Notifiable, HasApiTokens;

    public $timestamps = false;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'user_id'
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'user'
    ];

    protected $attributes = [
        'status' => CourierStatus::NOT_ACTIVATED
    ];

    protected $appends = [
        "name", "phone"
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

    // Relationships
    public function productsOnHand()
    {
        return $this->orders()->reduce(function(){

        });
    }

    public function orders()
    {
        return $this->hasMany('App\Orders\Order');
    }

    // TODO: refactor this, weak point, when dates are not corresponding
    public function ordersOnDate(int $date)
    {
        return $this->orders()->where('delivery_date', '=', $date);
    }

    public function inventoryReports()
    {
        return $this->hasOne(InventoryReport::class, 'courier_id', 'id')
            ->with('products')
            ->where('reported_at', '>', Carbon::now()->startOfDay()->timestamp);
    }

    public function cashReports(){
        return $this->hasOne(CashReport::class, 'courier_id', 'id')
            ->with('orders')
            ->where('reported_at', '>', Carbon::now()->startOfDay()->timestamp);
    }

    public function problemCashReports(){
        return $this->cashReports()
            ->where('status', '=', ReportStatus::PROBLEM);
    }

    public function problemInventoryReports(){
        return $this->inventoryReports()
            ->where('status', '=', ReportStatus::PROBLEM);
    }

    public function user()
    {
        return $this->belongsTo("App\Models\Users\User", "user_id", "id");
    }

    //----------------Accessors

    public function getNameAttribute()
    {
        return $this->user->name;
    }

    public function getPhoneAttribute()
    {
        return $this->user->phone;
    }

}
