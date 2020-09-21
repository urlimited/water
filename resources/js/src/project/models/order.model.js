import {USER_TYPE_COURIER, USER_TYPE_CUSTOMER, UserFactory} from "../auth/models/user.model";

export class Order {
    address = "";
    customer_id = 0;
    customer = UserFactory.createUser({role_id: USER_TYPE_CUSTOMER})
    totalPrice = 0;
    cart = [];
    deliveryDate = new Date();
    id = 0;
    courier = UserFactory.createUser({role_id: USER_TYPE_COURIER})
}