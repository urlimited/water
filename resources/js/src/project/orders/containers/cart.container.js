import {connect} from "react-redux";
import {apiGetProducts} from "../../dashboard/requests/getProducts.request";
import setCart from "../actions/setCart.action";
import {CartComponent} from "../components/cart.component";
import {UserFactory} from "../../auth/models/user.model";

const mapStateToProps = (state, ownProps) => ({
    productsList: state.data.products,
    productsInCart: state.currentOrderDetails.cart,
    user: UserFactory.createUser(state.userData)
});

const mapDispatchToProps = (dispatch, ownProps) => ({
    getProducts: () => dispatch(apiGetProducts()),
    setProductsInCart: (products) => dispatch(setCart(products))
});

export default connect(mapStateToProps, mapDispatchToProps)(CartComponent);