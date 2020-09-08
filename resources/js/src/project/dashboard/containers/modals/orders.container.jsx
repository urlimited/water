import {connect} from "react-redux";
import {OrdersModal} from "../../modals/orders.modal";
import {apiGetProducts} from "../../requests/getProducts.request";
import {apiGetCouriers} from "../../requests/getCouriers.request";
import {apiCreateOrder} from "../../requests/orderCreate.request";
import {apiCreateCustomer} from "../../requests/customerCreate.request";
import {apiGetCustomers} from "../../requests/getCustomers.request";
import {apiGetOrders} from "../../requests/getOrders.request";
import {apiUpdateOrder} from "../../requests/orderUpdate.request";
import {Order} from "../../../models/order.model";
import setCart from "../../../orders/actions/setCart.action";

const mapStateToProps = (state, ownProps) => ({
    products: state.data.products,
    couriers: state.data.couriers,
    customers: state.data.customers,
    order: (state.data.orders
        .find(order => order.id === state.pageData.pageSettings.currentOrder) ?? new Order()),
    productsInCart: state.currentOrderDetails.cart,
    pageData: state.pageData
});

const mapDispatchToProps = (dispatch, ownProps) => ({
    getOrders: () => dispatch(apiGetOrders()),
    getProducts: () => dispatch(apiGetProducts()),
    getCouriers: () => dispatch(apiGetCouriers()),
    getCustomers: () => dispatch(apiGetCustomers()),
    createOrder: (data) => dispatch(apiCreateOrder(data)),
    updateOrder: (data) => dispatch(apiUpdateOrder(data)),
    createCustomer: (data) => dispatch(apiCreateCustomer(data)),
    setProductsInCart: (products) => dispatch(setCart(products))
});

export default connect(mapStateToProps, mapDispatchToProps)(OrdersModal);