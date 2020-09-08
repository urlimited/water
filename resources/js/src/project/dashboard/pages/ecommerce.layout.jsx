import React, {useEffect} from "react";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const EcommerceLayout = ({getUser, user, Page, Modals}) => {
    useEffect(() => {
        getUser();
    }, []);

    return (
        <>
            <Page user={user}/>
            <ToastContainer />
            <Modals user={user}/>
        </>
    )
};

export default EcommerceLayout;