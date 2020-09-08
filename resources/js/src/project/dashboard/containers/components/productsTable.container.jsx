import {connect} from "react-redux";
import {ProductsTableComponent} from "../../components/productsTable.component";
import {apiGetProducts} from "../../requests/getProducts.request";
import setPageSettings from "../../../../core/pageSettings/actions/setPageSettings";

const mapStateToProps = (state, ownProps) => ({
    products: state.data.products
});

const mapDispatchToProps = (dispatch, ownProps) => ({
    getProducts: () => dispatch(apiGetProducts()),
    setCurrentProduct: (product) => dispatch(setPageSettings({currentProduct: product}))
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductsTableComponent);