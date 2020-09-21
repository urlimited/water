import React, {useEffect} from "react";
import ProblemsTable from "../containers/components/problemsTable.container";


const ProblemsPage = ({getUser, user}) => {

    return (
        <>
            {user.isSeller()
                ? <ProblemsTable user={user}/>
                : <></>
            }
        </>
    )
};

export default ProblemsPage;