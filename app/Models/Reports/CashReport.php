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
class CashReport extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = ['courier_id', 'cash_on_hand', 'reported_at', 'status'];

    protected $hidden = [];

    public $timestamps = false;

    public $table = 'couriers_cash_report';

    public function orders(){
        return $this->hasMany(CashReportOrder::class, 'report_id', 'id');
    }

    public function courier(){
        return $this->belongsTo(Courier::class, 'courier_id');
    }
}