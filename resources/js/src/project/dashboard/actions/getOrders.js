import * as actions from "../constants/actions.constant";

const getOrders = (filters, sorts) => ({
    type: actions.ACTION_GET_ORDERS,
    filters, sorts
});

export default getOrders;