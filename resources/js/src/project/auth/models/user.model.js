export class User{
    constructor(data) {
        this.id = data.id ?? 0;
        this.name = data.name ?? "";
        this.address = data.address ?? "";
        this.email = data.email ?? "";
        this.phone = data.phone ?? "";
    }

    isAdmin = () => this instanceof Admin;
    isCustomer = () => this instanceof Customer;
    isCourier = () => this instanceof Courier;
    isSeller = () => this instanceof Seller;
    isWarehouser = () => this instanceof Warehouser;
    isCashier = () => this instanceof Cashier;
    isNotLoadedUser = () => this instanceof NotLoadedUser;
}

export class UserFactory {
    static createUser = (data) => {
        const processedUserType = {
            "1": "customer",
            "2": "courier",
            "3": "seller",
            "4": "admin",
            "5": "not_loaded",
            "6": "warehouser",
            "7": "cashier"
        }[data.role_id ?? 5]

        if(processedUserType === "customer")
            return new Customer(data);

        if(processedUserType === "courier")
            return new Courier(data);

        if(processedUserType === "seller")
            return new Seller(data);

        if(processedUserType === "admin")
            return new Admin(data);

        if(processedUserType === "warehouser")
            return new Warehouser(data);

        if(processedUserType === "cashier")
            return new Cashier(data);

        return new NotLoadedUser(data);
    }
}



export class Customer extends User{
    _permissions = [""];

    constructor(data) {
        super(data);

        this.org_type = data.org_type ? {
            "1": INDIVIDUAL_ORGANIZATION_TYPE,
            "2": LEGAL_ORGANIZATION_TYPE
        }[data.org_type] : "1";
    }
}

export class Courier extends User{
    _permissions = [""];

    constructor(data) {
        super(data);

        this.id = data.id ?? 0;
    }
}

export class Seller  extends User{
    _permissions = [""];

    constructor(data) {
        super(data);
    }
}

export class Admin extends User{
    _permissions = [""];

    constructor(data) {
        super(data);
    }
}

export class Warehouser extends User{
    _permissions = [""];

    constructor(data) {
        super(data);
    }
}

export class Cashier extends User{
    _permissions = [""];

    constructor(data) {
        super(data);
    }
}

export class NotLoadedUser extends User {
    constructor(data) {
        super(data);
    }
}

export const LEGAL_ORGANIZATION_TYPE = "legal";
export const INDIVIDUAL_ORGANIZATION_TYPE = "individual";

export const USER_TYPE_CUSTOMER = 1;
export const USER_TYPE_COURIER = 2;
export const USER_TYPE_SELLER = 3;
export const USER_TYPE_ADMIN = 4;
export const USER_TYPE_NOT_LOADED = 5;