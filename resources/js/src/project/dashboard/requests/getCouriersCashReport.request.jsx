import * as constants from "../constants/urls.constant";
import * as events from "../../../core/auth/events";
import * as core_events from "../../../core/events";
import {AuthFailedException} from "../../../core/auth/exceptions";
import {DefaultRequest} from "../../../core/defaults/models/request.model";
import setCashReports from "../actions/setCashReports";


export const apiGetCouriersCashReport = (data) => dispatch => {
    dispatch(core_events.eventInitRequest());

    return fetch(constants.API_GET_COURIERS_CASH_REPORT, (new DefaultRequest()).setParams({
        method: "get",
    }).getRequest()).then(response => {
        if (response.status === 401)
            throw new AuthFailedException();

        return response.json()
    }, e => dispatch(events.eventConnectionError()))
        .then(json => {
            dispatch(setCashReports(_postProcessData(json.couriers)));
        }, e => dispatch(events.eventAuthFailed()));
}

const _postProcessData = (data) => {
    return data.map(courier => {
        console.log(courier);
        return ({
            id: courier.id,
            courier: courier,
            cashReportId: courier.cash_report_id,
            cashAtBeginning: courier.cash_reports
                ? courier.cash_reports.cash_on_hand
                : 0,
            cashDuringDay: courier.orders_during_day.length > 0
                ? courier.orders_during_day.reduce((accum, next) => accum + next.price_ordered * next.amount_ordered, 0)
                : 0,
            ordersDuringDay: courier.orders_during_day.length > 0
                ? courier.orders_during_day
                : [],
            cashAtEnd: [],
            status: courier.cash_reports
                ? courier.cash_reports.status
                : "empty"
        })
    });
}