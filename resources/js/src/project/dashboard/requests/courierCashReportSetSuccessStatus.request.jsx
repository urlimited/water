import * as constants from "../constants/urls.constant";
import * as events from "../../../core/auth/events";
import * as core_events from "../../../core/events";
import {AuthFailedException} from "../../../core/auth/exceptions";
import {DefaultRequest} from "../../../core/defaults/models/request.model";


export const apiCourierSetCashReportStatusSuccess = (data) => dispatch => {
    dispatch(core_events.eventInitRequest());

    return fetch(constants.API_SET_CASH_REPORT_SUCCESS, (new DefaultRequest()).setParams({
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
        .map(key => key + "=" + data[key])
        .reduce((accum, next) => accum + "&" + next);
}