import * as actions from "../constants/actions.constant";

const setCouriers = (couriers) => ({
    type: actions.ACTION_SET_COURIERS,
    couriers
});

export default setCouriers;