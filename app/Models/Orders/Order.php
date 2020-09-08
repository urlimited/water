<?php

namespace App\Models\Orders;

use App\Enums\OrderStatus;
use App\Models\Products\Product;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Collection;

/**
 * @method static create($data)
 * @method static find($id)
 * @property Collection<Product> products
 * @property int id
 */
class Order extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = ["customer_id", "status", "delivery_date", "courier_id", "address", "ordered_at"];

    protected $attributes = [
        "status" => OrderStatus::INITIATED
    ];

    protected $hidden = [
        "courier_id", "customer_id", "pivot"
    ];

    // Relationships
    public function products(){
        return $this->belongsToMany('App\Models\Products\Product', "order_products")
            ->withPivot(['amount_ordered', 'price_ordered']);
    }

    public function courier(){
        return $this->belongsTo('App\Models\Users\Courier', "courier_id", "id");
    }

    public function customer(){
        return $this->belongsTo('App\Models\Users\Customer', "customer_id", "id");
    }

    public $timestamps = false;
}