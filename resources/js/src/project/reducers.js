import { combineReducers } from 'redux';
import authReducer from "../core/auth/reducer";
import pageReducer from "../core/pageSettings/reducer";
import dataReducer from "../project/dashboard/reducer";
import currentOrderDetailsReducer from "../project/orders/reducer";

export default combineReducers({
    userData: authReducer,
    pageData: pageReducer,
    data: dataReducer,
    currentOrderDetails: currentOrderDetailsReducer
});