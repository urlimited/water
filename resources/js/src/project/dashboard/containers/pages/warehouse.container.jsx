import {connect} from "react-redux";
import WarehousePage from "../../pages/warehouse.page";
import {apiGetCouriersInventoryReport} from "../../requests/getCouriersInventoryReport.request";

const mapStateToProps = (state, ownProps) => ({

})

const mapDispatchToProps = (dispatch, ownProps) => ({
    getCouriersInventoryReport: () => dispatch(apiGetCouriersInventoryReport())
});

export default connect(mapStateToProps, mapDispatchToProps)(WarehousePage);