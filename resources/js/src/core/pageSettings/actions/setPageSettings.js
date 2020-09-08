import * as actions from "../constants/actions";

const setPageSettings = (pageSettings) => ({
    type: actions.ACTION_SET_PAGE_SETTINGS,
    pageSettings
});

export default setPageSettings;