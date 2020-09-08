<?php

namespace App\Models\Products;

use Illuminate\Database\Eloquent\Model;

/**
 * @method static create(array $data)
 * @method static find(int $id)
 */
class WarehouseRecord extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = ["product_id", "operation", "amount", "order_id"];

    protected $table = "products_on_stock";

    protected static function booted()
    {
        static::creating(function ($warehouseRecord) {
            $warehouseRecord->recorded_at = time();
        });
    }

    public $timestamps = false;
}