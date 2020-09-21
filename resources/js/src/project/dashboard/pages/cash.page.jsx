import React, {useEffect} from "react";
import CashTableComponent from "../containers/components/cashTable.container";


const CashPage = ({getUser, user}) => {

    return (
        <>
            {user.isCashier() || user.isSeller()
                ? <CashTableComponent user={user}/>
                : <></>
            }
        </>
    )
};

export default CashPage;