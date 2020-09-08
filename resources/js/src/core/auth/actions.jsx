import * as constants from "./constants/constants";
// TODO: please, document that all methods started with "set" will be change current state through reducers (api)
export const setUser = (userData) => ({
    ...userData,
    type: constants.ACTION_SET_USER
});