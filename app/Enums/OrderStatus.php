<?php

namespace App\Enums;

use BenSampo\Enum\Enum;

/**
 * @method static static OptionOne()
 * @method static static OptionTwo()
 * @method static static OptionThree()
 */
final class OrderStatus extends Enum
{
    const INITIATED =   1;
    const IN_DELIVERY =   2;
    const CANCELLED_BY_CUSTOMER = 3;
    const CANCELLED_BY_SELLER = 4;
    const DELIVERED = 5;
    const NOT_DELIVERED = 6;
}
