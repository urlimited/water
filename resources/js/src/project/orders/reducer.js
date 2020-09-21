import * as actions from "./constants/actions.constant";

const initialState = {
    cart: [],
    details: []
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actions.ACTION_SET_CART:
            return {
                ...state,
                cart: action.products
            }

        default:
            return state;
    }
};

export default reducer;