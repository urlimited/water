import * as actions from "../constants/actions.constant";

const setInventoryReports = (reports) => ({
    type: actions.ACTION_SET_INVENTORY_REPORTS,
    reports
});

export default setInventoryReports;