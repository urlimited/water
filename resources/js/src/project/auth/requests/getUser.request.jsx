import * as constants from "../../../core/auth/constants/constants";
import * as events from "../../../core/auth/events";
import * as core_events from "../../../core/events";
import * as actions from "../../../core/auth/actions";
import {AuthFailedException} from "../../../core/auth/exceptions";
import {DefaultRequest} from "../../../core/defaults/models/request.model";
import {UserFactory} from "../models/user.model";


export const apiGetUserRequest = (isRedirectRequired = true) => dispatch => {
    dispatch(core_events.eventInitRequest());
    return fetch(constants.API_GET_USER, (new DefaultRequest()).setParams({
        method: "get",
    }).getRequest()).then(response => {
        if (response.status === 401)
            throw new AuthFailedException();

        return response.json()
    }, e => dispatch(events.eventConnectionError()))
        .then(json => {
            dispatch(actions.setUser(json.user));

        }, e => dispatch(events.eventAuthFailed(isRedirectRequired, false)));
}

export const _processRequest = (data) => UserFactory.createUser(data.role_id, data);