import React, {useEffect} from "react";
import OrdersTableBlock from "../containers/components/ordersTable.container";
import history from "../../../core/services/history";
import {ROUTE_TO_WAREHOUSE} from "../../routes";

const DashboardPage = ({getUser, user}) => {

    return (
        <>
            {user.isSeller()
                ? <OrdersTableBlock user={user}/>
                : <></>
            }

            {user.isWarehouser()
                ? history.push(ROUTE_TO_WAREHOUSE)
                : <></>
            }

            {user.isCashier()
                ? history.push(ROUTE_TO_WAREHOUSE)
                : <></>
            }
        </>
    )
};

export default DashboardPage;