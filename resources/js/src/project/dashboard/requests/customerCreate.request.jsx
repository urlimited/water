import * as constants from "../constants/urls.constant";
import * as events from "../../../core/auth/events";
import * as core_events from "../../../core/events";
import {AuthFailedException} from "../../../core/auth/exceptions";
import {DefaultRequest} from "../../../core/defaults/models/request.model";
import {DataNotValidException} from "../../exceptions/DataNotValid.exception";
import {Response} from "../../../core/defaults/models/response.model";
import {toast} from "react-toastify";
import {VALUE_INDIVIDUAL, VALUE_LEGAL} from "../../auth/checkboxes.constant";

export const apiCreateCustomer = (data) => dispatch => {
    dispatch(core_events.eventInitRequest());

    return fetch(constants.API_CREATE_CUSTOMER, (new DefaultRequest()).setParams({
        method: "post",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: _preProcessData(data)
    }).getRequest()).then(response => {
        if (response.status === 401)
            throw new AuthFailedException();

        if (response.status === 422)
            return response.json()
                .then(json => {
                    throw new DataNotValidException(json)
                });

        if (response.status === 200)
            return response.json();

    }, e => dispatch(events.eventConnectionError()))
        .then(json => {
            toast.success(`Покупатель ${data.name} был успешно создан`, {
                className: "toast-error",
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                //progress: undefined,
            });
        }, e => {
            // TODO: refactor, Weak point
            if (e instanceof DataNotValidException) {
                toast.error(e.message, {
                    className: "toast-error",
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    //progress: undefined,
                });

                return new Response({status: 422, message: e.message});
            }

            if (e instanceof AuthFailedException)
                dispatch(events.eventAuthFailed());
        });
}

const _preProcessData = (data) => {
    const processedData = {
        name: data.name,
        phone: data.phone,
        email: data.email,
        org_type_id: {
            [VALUE_INDIVIDUAL]: 1,
            [VALUE_LEGAL]: 2
        }[data.org_type_id]
    };

    return Object.keys(processedData)
        .map(key => key + "=" + processedData[key])
        .reduce((accum, next) => accum + "&" + next);
}