import * as actions from "../constants/actions.constant";

const setCart = (products) => ({
    type: actions.ACTION_SET_CART,
    products
});

export default setCart;