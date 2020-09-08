import * as actions from "../constants/actions";

const setPageNotifications = (pageNotifications) => ({
    type: actions.ACTION_SET_PAGE_NOTIFICATIONS,
    pageNotifications
});

export default setPageNotifications;