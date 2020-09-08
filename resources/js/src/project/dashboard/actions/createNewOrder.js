import * as actions from "../constants/actions.constant";

const createNewOrder = (order) => ({
    type: actions.ACTION_CREATE_NEW_ORDER,
    order
});

export default createNewOrder;