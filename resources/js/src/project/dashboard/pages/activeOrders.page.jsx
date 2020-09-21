import React, {useEffect} from "react";
import WarehouseTableBlock from "../containers/components/warehouseTable.container";
import CashTableBlock from "../containers/components/cashTable.container";
import OrdersTableBlock from "../containers/components/ordersTable.container";


const ProductsPage = ({getUser, user}) => {

    return (
        <>
            {user.isSeller()
                ? <OrdersTableBlock user={user}/>
                : <></>
            }

            {user.isWarehouser()
                ? <WarehouseTableBlock user={user}/>
                : <></>
            }

            {user.isCashier()
                ? <CashTableBlock user={user}/>
                : <></>
            }
        </>
    )
};

export default ProductsPage;