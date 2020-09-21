<?php

namespace App\Models\Reports;

use App\Models\Users\Courier;
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
class InventoryReport extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = ["courier_id", "reported_at", "status"];

    protected $hidden = ['courier_id'];

    protected $appends = [''];

    public $timestamps = false;

    public $table = "courier_inventory_report";

    public function products(){
        return $this->hasMany(InventoryReportProduct::class, 'report_id', 'id');
    }

    public function courier(){
        return $this->belongsTo(Courier::class, 'courier_id', 'id');
    }

}