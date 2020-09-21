import * as constants from "./constants";

export const eventInitRequest = () => ({
    type: constants.EVENT_REQUEST_INITIATED,
    isFetching: true
});

export const eventRequestProcessed = () => ({
    type: constants.EVENT_REQUEST_PROCESSED,
    success: false,
    isFetching: false
});