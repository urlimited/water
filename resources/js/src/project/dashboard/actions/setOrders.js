import * as actions from "../constants/actions.constant";

const setOrders = (orders) => ({
    type: actions.ACTION_SET_ORDERS,
    orders
});

export default setOrders;