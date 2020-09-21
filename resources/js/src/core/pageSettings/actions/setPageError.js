import * as actions from "../constants/actions";

const setPageError = (pageError) => ({
    type: actions.ACTION_SET_PAGE_ERROR,
    pageError
});

export default setPageError;