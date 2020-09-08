import {connect} from "react-redux";
import {CashModals} from "../../modals/cash.modal";
import {apiCourierSetCashAtBeginning} from "../../requests/courierSetCashAtBeginning.request";
import {apiGetCouriersCashReport} from "../../requests/getCouriersCashReport.request";

const mapStateToProps = (state, ownProps) => ({
    selectedCourierId: state.pageData.pageSettings.currentCourierId ?? 0,
    cashReport: state.data.cashReports
        .find(report => report.id === state.pageData.pageSettings.currentCourierId)
});


const mapDispatchToProps = (dispatch, ownProps) => ({
    setCashAtBeginning: (data) => dispatch(apiCourierSetCashAtBeginning(data)),
    getCashReports: () => dispatch(apiGetCouriersCashReport())
});

export default connect(mapStateToProps, mapDispatchToProps)(CashModals);
