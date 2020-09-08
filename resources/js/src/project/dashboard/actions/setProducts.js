import * as actions from "../constants/actions.constant";

const setProducts = (products) => ({
    type: actions.ACTION_SET_PRODUCTS,
    products
});

export default setProducts;