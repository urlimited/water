import * as constants from "../constants/urls.constant";
import * as events from "../../../core/auth/events";
import * as core_events from "../../../core/events";
import {AuthFailedException} from "../../../core/auth/exceptions";
import {DefaultRequest} from "../../../core/defaults/models/request.model";
import {
    ORDER_STATUS_CANCELLED_BY_CUSTOMER, ORDER_STATUS_CANCELLED_BY_SELLER, ORDER_STATUS_DELIVERED,
    ORDER_STATUS_IN_DELIVERY,
    ORDER_STATUS_INITIATED, ORDER_STATUS_NOT_DELIVERED
} from "../constants/statuses.constant";


export const apiUpdateOrder = (data) => dispatch => {
    dispatch(core_events.eventInitRequest());

    return fetch(constants.API_UPDATE_ORDER, (new DefaultRequest()).setParams({
        method: "put",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: _preProcessData(data)
    }).getRequest()).then(response => {
        if (response.status === 401)
            throw new AuthFailedException();

        return response.json()
    }, e => dispatch(events.eventConnectionError()))
        .then(json => {
        }, e => dispatch(events.eventAuthFailed()));
}

const _preProcessData = (data) => {
    return Object.keys(data)
        .map(key => {
            if (key === "status")
                return "status=" + {
                    [ORDER_STATUS_INITIATED]: 1,
                    [ORDER_STATUS_IN_DELIVERY]: 2,
                    [ORDER_STATUS_CANCELLED_BY_CUSTOMER]: 3,
                    [ORDER_STATUS_CANCELLED_BY_SELLER]: 4,
                    [ORDER_STATUS_DELIVERED]: 5,
                    [ORDER_STATUS_NOT_DELIVERED]: 6,
                }[data["status"]]

            return key + "=" + data[key]
        })
        .reduce((accum, next) => accum + "&" + next);
}