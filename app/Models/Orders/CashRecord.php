<?php

namespace App\Models\Orders;

use App\Enums\OrderStatus;
use Illuminate\Database\Eloquent\Model;

/**
 * @method static create($data)
 * @method static find($id)
 */
class CashRecord extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */

    public $timestamps = false;
}