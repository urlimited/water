<?php

namespace App\Models\Reports;

use App\Models\Products\Product;
use Illuminate\Database\Eloquent\Model;

/**
 * @method static create($data)
 * @method static find($id)
 * @property int id
 * @property int amount
 * @property int volume
 * @property mixed warehouseRecords
 * @property int amount_ordered
 */
class InventoryReportProduct extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = ["report_id", "product_id", "amount"];

    protected $hidden = [];

    protected $appends = ['product_name', 'product_volume'];

    public $table = "courier_inventory_products";

    public $timestamps = false;

    public function getProductNameAttribute(){
        return Product::find($this->product_id)->name;
    }

    public function getProductVolumeAttribute(){
        return Product::find($this->product_id)->volume;
    }
}