<?php

namespace App\Enums;

use BenSampo\Enum\Enum;

/**
 * @method static static OptionOne()
 * @method static static OptionTwo()
 * @method static static OptionThree()
 */
final class OrderOperationType extends Enum
{
    const CREATED =   "order_created";
    const UPDATED =   "order_updated";
    const CANCELLED = "order_cancelled";
    const INIT = "initialised";
}
