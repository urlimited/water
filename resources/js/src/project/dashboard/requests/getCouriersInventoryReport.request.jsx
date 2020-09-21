import * as constants from "../constants/urls.constant";
import * as events from "../../../core/auth/events";
import * as core_events from "../../../core/events";
import {AuthFailedException} from "../../../core/auth/exceptions";
import {DefaultRequest} from "../../../core/defaults/models/request.model";
import setCouriers from "../actions/setCouriers";
import {USER_TYPE_COURIER, UserFactory} from "../../auth/models/user.model";
import {
    ORDER_STATUS_CANCELLED_BY_CUSTOMER, ORDER_STATUS_CANCELLED_BY_SELLER, ORDER_STATUS_DELIVERED,
    ORDER_STATUS_IN_DELIVERY,
    ORDER_STATUS_INITIATED, ORDER_STATUS_NOT_DELIVERED
} from "../constants/statuses.constant";
import setInventoryReports from "../actions/setInventoryReports";


export const apiGetCouriersInventoryReport = (data) => dispatch => {
    dispatch(core_events.eventInitRequest());

    return fetch(constants.API_GET_COURIERS_INVENTORY_REPORT, (new DefaultRequest()).setParams({
        method: "get",
    }).getRequest()).then(response => {
        if (response.status === 401)
            throw new AuthFailedException();

        return response.json()
    }, e => dispatch(events.eventConnectionError()))
        .then(json => {
            dispatch(setInventoryReports(_postProcessData(json.couriers)));
        }, e => dispatch(events.eventAuthFailed()));
}

const _postProcessData = (data) => {
    return data.map(courier => ({
            id: courier.id,
            courier: courier,
            inventoryReportId: courier.inventory_report_id,
            inventoryAtBeginning: courier.inventory_reports
                ? courier.inventory_reports.products
                : [],
            inventoryDuringDay: courier.products_during_day,
            inventoryAtEnd: [],
            status: courier.inventory_reports
                ? courier.inventory_reports.status
                : "empty"
        }));
}