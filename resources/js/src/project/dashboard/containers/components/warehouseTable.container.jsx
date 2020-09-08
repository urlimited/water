import {connect} from "react-redux";
import {WarehouseTableComponent} from "../../components/warehouseTable.component";
import {apiGetOrders} from "../../requests/getOrders.request";
import setPageSettings from "../../../../core/pageSettings/actions/setPageSettings";
import setCart from "../../../orders/actions/setCart.action";
import {apiCourierSetInventoryReportStatusSuccess} from "../../requests/courierInventoryReportSetSuccessStatus.request";
import {apiCourierSetInventoryReportStatusFail} from "../../requests/courierInventoryReportSetFailStatus.request";
import {apiGetCouriersInventoryReport} from "../../requests/getCouriersInventoryReport.request";

const mapStateToProps = (state, ownProps) => ({
    reports: state.data.inventoryReports,
    products: state.data.products
});

const mapDispatchToProps = (dispatch, ownProps) => ({
    setCurrentCourierId: (courier) => dispatch(setPageSettings({currentCourierId: courier})),
    setCart: (data) => dispatch(setCart(data)),
    setReportSuccess: (report_id) => dispatch(apiCourierSetInventoryReportStatusSuccess({report_id})),
    setReportFail: (report_id) => dispatch(apiCourierSetInventoryReportStatusFail({report_id})),
    getInventoryReports: () => dispatch(apiGetCouriersInventoryReport())
});

export default connect(mapStateToProps, mapDispatchToProps)(WarehouseTableComponent);