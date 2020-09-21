import {connect} from "react-redux";
import {ProductsModal} from "../../modals/products.modal";
import {apiCreateProduct} from "../../requests/productCreate.request";
import {apiGetProducts} from "../../requests/getProducts.request";
import {Product} from "../../models/product.model";
import {apiUpdateProduct} from "../../requests/productUpdate.request";
import {apiDeleteProduct} from "../../requests/productDelete.request";

const mapStateToProps = (state, ownProps) => ({
    product: (state.data.products
            .find(product => product.id === state.pageData.pageSettings.currentProduct) ?? new Product())
});

const mapDispatchToProps = (dispatch, ownProps) => ({
    createProduct: (data) => dispatch(apiCreateProduct(data)),
    updateProduct: (data) => dispatch(apiUpdateProduct(data)),
    getProducts: (data) => dispatch(apiGetProducts(data)),
    deleteProduct: (data) => dispatch(apiDeleteProduct(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductsModal);