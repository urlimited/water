import {connect} from "react-redux";
import {CashTableComponent} from "../../components/cashTable.component";
import setPageSettings from "../../../../core/pageSettings/actions/setPageSettings";
import {apiGetCouriersCashReport} from "../../requests/getCouriersCashReport.request";
import {apiCourierSetCashReportStatusSuccess} from "../../requests/courierCashReportSetSuccessStatus.request";
import {apiCourierSetCashReportStatusFail} from "../../requests/courierCashReportSetFailStatus.request";

const mapStateToProps = (state, ownProps) => ({
    cashReports: state.data.cashReports,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
    getCashReports: () => dispatch(apiGetCouriersCashReport()),
    setCurrentCourierId: (courier_id) => dispatch(setPageSettings({currentCourierId: courier_id})),
    setCashReportSuccess: (report_id) => dispatch(apiCourierSetCashReportStatusSuccess({report_id})),
    setCashReportFail: (report_id) => dispatch(apiCourierSetCashReportStatusFail({report_id}))
});

export default connect(mapStateToProps, mapDispatchToProps)(CashTableComponent);