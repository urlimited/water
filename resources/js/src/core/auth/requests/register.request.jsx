import * as constants from "../constants/constants";
import * as core_events from "../../events";
import {DefaultRequest} from "../../defaults/models/request.model";
import {apiAuthRequest} from "./login.request";
import {toast} from "react-toastify";
import {Response} from "../../defaults/models/response.model";
import {DataNotValidException} from "../../../project/exceptions/DataNotValid.exception";


export const apiRegisterRequest = (data) => dispatch => {
    dispatch(core_events.eventInitRequest());
    return fetch(constants.API_REGISTER, (new DefaultRequest()).setParams({
        method: "post",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: preProcessData(data)
    }).getRequest())
        .then(response => {
            if (response.status === 422)
                return response.json()
                    .then(json => {
                        throw new DataNotValidException(json)
                    });

            if (response.status === 200)
                return response.json();
        }/*dispatch(events.eventAuthFailed())*/)
        .then(json => {
            console.log("qweqwe");
            dispatch(apiAuthRequest(data['email'], data['password']));

        }, e => {
            if(e instanceof DataNotValidException){
                toast.error(e.message, {
                    className: "toast-error",
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                });

                return new Response({status: 422, message: e.message});
            }
        });
}

const preProcessData = (data) => {
    const processedData = {
        name: data.name,
        password: data.password,
        phone: data.phone,
        address: data.address,
        email: data.email,
        org_type_id: {
            legal: 1,
            individual: 2
        }[data.org_type_id]
    };

    return Object.keys(processedData)
        .map(key => key + "=" + processedData[key])
        .reduce((accum, next) => accum + "&" + next);
}