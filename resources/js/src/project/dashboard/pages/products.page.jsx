import React, {useEffect} from "react";
import ProductsTableComponent from "../containers/components/productsTable.container";


const ProductsPage = ({getUser, user}) => {

    return (
        <>
            <ProductsTableComponent/>
        </>
    )
};

export default ProductsPage;