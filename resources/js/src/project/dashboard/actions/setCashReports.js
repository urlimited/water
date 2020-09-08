import * as actions from "../constants/actions.constant";

const setCashReports = (reports) => ({
    type: actions.ACTION_SET_CASH_REPORTS,
    reports
});

export default setCashReports;