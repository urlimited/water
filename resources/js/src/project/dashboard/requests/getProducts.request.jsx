// TODO: please, document that all methods started with "api" will be sended to server (api)
import * as constants from "../constants/urls.constant";
import * as events from "../../../core/auth/events";
import * as core_events from "../../../core/events";
//TODO спланировать архитектуру по модулям и core и переделать нижние строчки
import {AuthFailedException} from "../../../core/auth/exceptions";
import {DefaultRequest} from "../../../core/defaults/models/request.model";
import setProducts from "../actions/setProducts";


export const apiGetProducts = () => dispatch => {
    dispatch(core_events.eventInitRequest());

    return fetch(constants.API_GET_PRODUCTS, (new DefaultRequest()).setParams({
        method: "get",
    }).getRequest()).then(response => {
        if (response.status === 401)
            throw new AuthFailedException();

        return response.json()
    }, e => dispatch(events.eventConnectionError()))
        .then(json => {
            dispatch(setProducts(_postProcessData(json.products)));
        }, e => dispatch(events.eventAuthFailed()));
}

const _preProcessData = (data) => {
    return Object.keys(data)
        .map(key => key + "=" + data[key])
        .reduce((accum, next) => accum + "&" + next);
}

const _postProcessData = (data) => data.map(product => ({
        id: product.id,
        name: product.name,
        volume: product.volume,
        price: product.price,
        color: product.icon_color,
        amount: product.available_amount,
    })
)