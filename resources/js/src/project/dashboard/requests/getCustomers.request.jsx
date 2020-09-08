import * as constants from "../constants/urls.constant";
import * as events from "../../../core/auth/events";
import * as core_events from "../../../core/events";
import {AuthFailedException} from "../../../core/auth/exceptions";
import {DefaultRequest} from "../../../core/defaults/models/request.model";
import setCustomers from "../actions/setCustomers";
import {UserFactory} from "../../auth/models/user.model";
import {Response} from "../../../core/defaults/models/response.model";


export const apiGetCustomers = (data) => dispatch => {
    dispatch(core_events.eventInitRequest());

    return fetch(constants.API_GET_CUSTOMERS, (new DefaultRequest()).setParams({
        method: "get",
    }).getRequest()).then(response => {
        if (response.status === 401)
            throw new AuthFailedException();

        return response.json()
    }, e => dispatch(events.eventConnectionError()))
        .then(json => {
            dispatch(setCustomers(_postProcessData(json.customers)));

            return new Response({
                status: 200,
                message: json.customers
            })
        }, e => dispatch(events.eventAuthFailed()));
}

const _preProcessData = (data) => {
    return Object.keys(data)
        .map(key => key + "=" + data[key])
        .reduce((accum, next) => accum + "&" + next);
}

const _postProcessData = (data) => data.map(customer => UserFactory.createUser(customer));
