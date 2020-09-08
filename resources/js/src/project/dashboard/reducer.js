import * as actions from "./constants/actions.constant";

const initialState = {
    orders: [],
    products: [],
    couriers: [],
    customers: [],
    inventoryReports: [],
    cashReports: [],
    problems: []
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actions.ACTION_SET_PRODUCTS:
            return {
                ...state,
                products: action.products
            }

        case actions.ACTION_SET_COURIERS:
            return {
                ...state,
                couriers: action.couriers
            }

        case actions.ACTION_SET_CUSTOMERS:
            return {
                ...state,
                customers: action.customers
            }

        case actions.ACTION_SET_ORDERS:
            return {
                ...state,
                orders: action.orders
            }

        case actions.ACTION_SET_INVENTORY_REPORTS:
            return {
                ...state,
                inventoryReports: action.reports
            }

        case actions.ACTION_SET_CASH_REPORTS:
            return {
                ...state,
                cashReports: action.reports
            }

        case actions.ACTION_SET_PROBLEMS:
            return {
                ...state,
                problems: action.problems
            }

        default:
            return state;
    }
};

export default reducer;