import React, {useEffect} from "react";
import WarehouseTableBlock from "../containers/components/warehouseTable.container";


const WarehousePage = ({getUser, user, getCouriersInventoryReport}) => {

    useEffect(() => {
        getCouriersInventoryReport()
    }, []);

    return (
        <>
            {user.isWarehouser() || user.isSeller()
                ? <WarehouseTableBlock user={user}/>
                : <></>
            }
        </>
    )
};

export default WarehousePage;