import * as constants from "../constants/urls.constant";
import * as events from "../../../core/auth/events";
import * as core_events from "../../../core/events";
import {AuthFailedException} from "../../../core/auth/exceptions";
import {DefaultRequest} from "../../../core/defaults/models/request.model";
import setProblems from "../actions/setProblems";


export const apiGetProblems = (data) => dispatch => {
    dispatch(core_events.eventInitRequest());

    return fetch(constants.API_GET_PROBLEMS, (new DefaultRequest()).setParams({
        method: "get",
    }).getRequest()).then(response => {
        if (response.status === 401)
            throw new AuthFailedException();

        return response.json()
    }, e => dispatch(events.eventConnectionError()))
        .then(json => {
            dispatch(setProblems(_postProcessData(json.problems)));
        }, e => dispatch(events.eventAuthFailed()));
}

const _preProcessData = (data) => {
    return Object.keys(data)
        .map(key => key + "=" + data[key])
        .reduce((accum, next) => accum + "&" + next);
}

const _postProcessData = (data) => data.map(problem => ({
    id: (problem.problem_type.substring(0,3) + "_" + problem.id),
    courier: problem.courier,
    type: problem.problem_type,
    date: new Date(problem.reported_at * 1000)
}));
