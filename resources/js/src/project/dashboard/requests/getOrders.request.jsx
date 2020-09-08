import * as constants from "../constants/urls.constant";
import * as events from "../../../core/auth/events";
import * as core_events from "../../../core/events";
import {AuthFailedException} from "../../../core/auth/exceptions";
import {DefaultRequest} from "../../../core/defaults/models/request.model";
import setOrders from "../actions/setOrders";
import {
    ORDER_STATUS_CANCELLED_BY_CUSTOMER, ORDER_STATUS_CANCELLED_BY_SELLER, ORDER_STATUS_DELIVERED,
    ORDER_STATUS_IN_DELIVERY,
    ORDER_STATUS_INITIATED, ORDER_STATUS_NOT_DELIVERED
} from "../constants/statuses.constant";
import {USER_TYPE_COURIER, UserFactory} from "../../auth/models/user.model";


export const apiGetOrders = (data) => dispatch => {
    dispatch(core_events.eventInitRequest());

    return fetch(constants.API_GET_ORDERS, (new DefaultRequest()).setParams({
        method: "get",
    }).getRequest()).then(response => {
        if (response.status === 401)
            throw new AuthFailedException();

        return response.json()
    }, e => dispatch(events.eventConnectionError()))
        .then(json => {
            dispatch(setOrders(_postProcessData(json.orders)));
        }, e => dispatch(events.eventAuthFailed()));
}

const _preProcessData = (data) => {
    return Object.keys(data)
        .map(key => key + "=" + data[key])
        .reduce((accum, next) => accum + "&" + next);
}

const _postProcessData = (data) => {
    return data.map(order => ({
        id: order.id,
        address: order.address,
        cart: order.products.map(product => ({
            id: product.id,
            name: product.name,
            volume: product.volume,
            amount: product.pivot.amount_ordered,
            price: product.pivot.price_ordered,
            icon_color: product.icon_color
        })),
        courier: order.courier ?? UserFactory.createUser({role_id: USER_TYPE_COURIER}),
        status: {
            "1": ORDER_STATUS_INITIATED,
            "2": ORDER_STATUS_IN_DELIVERY,
            "3": ORDER_STATUS_CANCELLED_BY_CUSTOMER,
            "4": ORDER_STATUS_CANCELLED_BY_SELLER,
            "5": ORDER_STATUS_DELIVERED,
            "6": ORDER_STATUS_NOT_DELIVERED,
        }[order.status],
        customer: order.customer,
        deliveryDate: order.delivery_date * 1000
    }));
}
