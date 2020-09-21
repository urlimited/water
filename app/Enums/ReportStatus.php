<?php

namespace App\Enums;

use BenSampo\Enum\Enum;

/**
 * @method static static OptionOne()
 * @method static static OptionTwo()
 * @method static static OptionThree()
 */
final class ReportStatus extends Enum
{
    const BEGINNING =   "beginning";
    const SUCCESS =   "success";
    const PROBLEM = "problem";
}
