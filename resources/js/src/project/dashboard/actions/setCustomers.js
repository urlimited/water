import * as actions from "../constants/actions.constant";

const setCustomers = (customers) => ({
    type: actions.ACTION_SET_CUSTOMERS,
    customers
});

export default setCustomers;