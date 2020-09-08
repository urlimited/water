// TODO: please, document that all methods started with "api" will be sended to server (api)
import * as constants from "../constants/constants";
import * as events from "../events";
import * as core_events from "../../events";
//TODO спланировать архитектуру по модулям и core и переделать нижние строчки
import {AuthFailedException} from "../exceptions";
import {DefaultRequest} from "../../defaults/models/request.model";
import history from "../../services/history";
import {ROUTE_TO_LOGIN_PAGE} from "../../../project/routes";


export const apiLogoutRequest = () => dispatch => {
    dispatch(core_events.eventInitRequest());
    return fetch(constants.API_LOGOUT, (new DefaultRequest()).setParams({
        method: "post",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        }
    }).getRequest()).then(response => {
        if (response.status === 401)
            throw new AuthFailedException();

        return response.json()
    }, e => dispatch(events.eventConnectionError()))
        .then(json => {
            history.push(ROUTE_TO_LOGIN_PAGE);
        }, e => dispatch(events.eventAuthFailed()));
}