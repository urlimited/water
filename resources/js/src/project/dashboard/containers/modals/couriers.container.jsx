import {connect} from "react-redux";
import {CouriersModal} from "../../modals/couriers.modal";
import {apiCreateCourier} from "../../requests/courierCreate.request";
import {apiGetCouriers} from "../../requests/getCouriers.request";

const mapStateToProps = (state, ownProps) => ({

});

const mapDispatchToProps = (dispatch, ownProps) => ({
    createCourier: (data) => dispatch(apiCreateCourier(data)),
    getCouriers: () => dispatch(apiGetCouriers())
});

export default connect(mapStateToProps, mapDispatchToProps)(CouriersModal);