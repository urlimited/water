<?php

namespace App\Models\Reports;

use App\Models\Orders\Order;
use Illuminate\Database\Eloquent\Model;

/**
 * @method static create($data)
 * @method static find($id)
 * @property int id
 * @property int amount
 * @property int volume
 * @property mixed warehouseRecords
 * @property int amount_ordered
 * @property mixed order_id
 */
class CashReportOrder extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [];

    protected $hidden = [];

    protected $appends = ['order_total_amount'];

    public $timestamps = false;

    public $table = 'couriers_cash_orders';

    public function getOrderTotalAmountAttribute(){
        return Order::find($this->order_id)->products->reduce(function($accum, $next){
            return $accum + $next->pivot->price_ordered * $next->pivot->amount_ordered;
        }, 0);
    }

}