<?php

namespace App\Models\Products;

use App\Enums\OrderOperationType;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

/**
 * @method static create($data)
 * @method static find($id)
 * @property int id
 * @property int amount
 * @property int volume
 * @property mixed warehouseRecords
 * @property int amount_ordered
 */
class Product extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = ["name", "volume", "amount", "price", "icon_color"];

    protected $hidden = ["deleted_at"];

    protected $appends = ["available_amount"];

    public $timestamps = false;

    public function getAvailableAmountAttribute()
    {
        return $this->getAvailableAmountOnTime(time());
    }

    public function getAvailableAmountOnTime(int $time){
        $initial_last = WarehouseRecord::where('product_id', '=', $this->id)
            ->where('operation', '=', OrderOperationType::INIT)
            ->where('recorded_at', '<=', $time)
            ->orderByDesc('recorded_at')
            ->first();

        $data = DB::table('products_on_stock')
            ->where('product_id', '=', $this->id)
            ->where('recorded_at', '>=', $initial_last->recorded_at ?? 0)
            ->where('recorded_at', '<=', $time)
            ->groupBy('operation')
            ->selectRaw('SUM(amount) as available_amount')
            ->selectRaw('operation')
            ->get();

        $bought = $data->reduce(function ($accum, $next) {
            if ($next->operation === OrderOperationType::CANCELLED)
                return $accum - $next->available_amount;

            if ($next->operation === OrderOperationType::CREATED || $next->operation === OrderOperationType::UPDATED)
                return $accum + $next->available_amount;

            return $accum;
        }, 0);

        return ($initial_last->amount ?? 0) - $bought;
    }

    public function getWarehouseRecords(int $date_begin, int $date_end)
    {
        return $this->warehouseRecords()
            ->where('recorded_at', '>=', $date_begin)
            ->where('recorded_at', '<=', $date_end)
            ->get();
    }

    public function recordToWarehouse(string $operation, ?int $order_id, int $amount)
    {
        WarehouseRecord::create([
            'product_id' => $this->id,
            'operation' => $operation,
            'amount' => $amount,
            'order_id' => $order_id
        ]);
    }

    public function warehouseRecords()
    {
        return $this->hasMany(WarehouseRecord::class, 'product_id');
    }
}