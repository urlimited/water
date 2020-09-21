import {connect} from "react-redux";
import {OrdersTableComponent} from "../../components/ordersTable.component";
import {apiGetOrders} from "../../requests/getOrders.request";
import setPageSettings from "../../../../core/pageSettings/actions/setPageSettings";

const mapStateToProps = (state, ownProps) => ({
    orders: state.data.orders,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
    getOrders: () => dispatch(apiGetOrders()),
    setCurrentOrder: (order) => dispatch(setPageSettings({currentOrder: order.id}))
});

export default connect(mapStateToProps, mapDispatchToProps)(OrdersTableComponent);