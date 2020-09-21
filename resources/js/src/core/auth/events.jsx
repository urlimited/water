import history from "../services/history";
import {
    ROUTE_TO_CASH,
    ROUTE_TO_DASHBOARD,
    ROUTE_TO_LOGIN_PAGE,
    ROUTE_TO_MAIN_PAGE,
    ROUTE_TO_WAREHOUSE
} from "../../project/routes";
import setPageError from "../pageSettings/actions/setPageError";
import {PageError} from "../pageSettings/models/PageError";
import * as errors from "./constants/errorsList.constant";
import clearPageError from "../pageSettings/actions/clearPageError";
import clearAllPageErrors from "../pageSettings/actions/clearAllPageErrors";

// TODO: document that all methods started with "event" will be change state general states (api)
// TODO: make extendable these events for different projects
export const eventAuthSuccess = (userData) => dispatch => {
    if (userData.role_id === 1)
        history.push(ROUTE_TO_MAIN_PAGE);
    else if (userData.role_id === 6)
        history.push(ROUTE_TO_WAREHOUSE);
    else if (userData.role_id === 7)
        history.push(ROUTE_TO_CASH);
    else
        history.push(ROUTE_TO_WAREHOUSE);

    dispatch(clearAllPageErrors());
};

export const eventAuthFailed = (isRedirectRequired, isShowErrors = true) => dispatch => {
    dispatch(clearPageError(errors.ERROR_AUTH_FAILED));

    if (isShowErrors)
        dispatch(setPageError(new PageError(errors.ERROR_AUTH_FAILED, "Вы ввели неверные пароль и/или логин")));

    if (isRedirectRequired)
        history.push(ROUTE_TO_LOGIN_PAGE);
};

export const eventConnectionError = () => dispatch => {
    dispatch(clearPageError(errors.ERROR_CONNECTION_ABORTED));
    dispatch(setPageError(new PageError(errors.ERROR_CONNECTION_ABORTED)));
};