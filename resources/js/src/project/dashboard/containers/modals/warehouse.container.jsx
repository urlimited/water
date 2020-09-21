import {connect} from "react-redux";
import {apiGetProducts} from "../../requests/getProducts.request";
import {WarehouseModals} from "../../modals/warehouse.modal";
import {apiGetCouriers} from "../../requests/getCouriers.request";
import {apiCourierSetProductsAtBeginning} from "../../requests/courierSetProductsAtBeginning.request";
import {apiGetCouriersInventoryReport} from "../../requests/getCouriersInventoryReport.request";

const mapStateToProps = (state, ownProps) => ({
    productsForCourier: state.currentOrderDetails.cart,
    selectedCourierId: state.pageData.pageSettings.currentCourierId ?? 0
});

const mapDispatchToProps = (dispatch, ownProps) => ({
    getProducts: () => dispatch(apiGetProducts()),
    getCouriers: () => dispatch(apiGetCouriers()),
    setProductsAtBeginning: (data) => dispatch(apiCourierSetProductsAtBeginning(data)),
    getInventoryReports: () => dispatch(apiGetCouriersInventoryReport())
});

export default connect(mapStateToProps, mapDispatchToProps)(WarehouseModals);
