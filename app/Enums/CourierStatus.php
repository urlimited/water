<?php

namespace App\Enums;

use BenSampo\Enum\Enum;

/**
 * @method static static OptionOne()
 * @method static static OptionTwo()
 * @method static static OptionThree()
 */
final class CourierStatus extends Enum
{
    const NOT_ACTIVATED = 0;
    const ACTIVATED = 1;
    const BANNED = 2;
}
