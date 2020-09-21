/*
import history from "../services/history";
import {loadState} from "../services/local_storage";
*/

export const authMiddleware = ({getState}) => next => action => {
    /*if ((getState().userData !== undefined && getState().userData.accessToken !== undefined)
        || history.location.pathname === "/login"
        || (loadState() !== undefined && loadState().userData.accessToken !== undefined))
        return next(action);

    return history.push('/login');*/

    return next(action);
};