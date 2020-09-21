import * as actions from "../constants/actions";

const clearPageError = (errorName) => ({
    type: actions.ACTION_CLEAR_PAGE_ERROR,
    errorName
});

export default clearPageError;