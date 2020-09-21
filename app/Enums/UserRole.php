<?php

namespace App\Enums;

use BenSampo\Enum\Enum;

/**
 * @method static static Customer()
 * @method static static Courier()
 * @method static static Seller()
 * @method static static Admin()
 */
final class UserRole extends Enum
{
    const CUSTOMER = 1;
    const COURIER = 2;
    const SELLER = 3;
    const ADMIN = 4;
    const WAREHOUSE = 6;
    const CASHIER = 7;
}
