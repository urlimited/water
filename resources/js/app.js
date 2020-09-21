import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from "react-redux";
import {Router, Route, Switch} from 'react-router-dom';
import {createStore, applyMiddleware} from 'redux';
import thunkMiddleware from 'redux-thunk';
import reducers from "./src/project/reducers";
import {authMiddleware} from "./src/core/auth/middlewares";
import * as routes from "./src/project/routes";
import history from "./src/core/services/history";

// Pages
import LoginPage from "./src/project/auth/pages/login.page";
import RegisterPage from "./src/project/auth/pages/register.page";
import DashboardLayout from "./src/project/dashboard/containers/layouts/dashboard.container";
import ProductsPage from "./src/project/dashboard/containers/pages/products.container";
import ActiveOrdersPage from "./src/project/dashboard/containers/pages/activeOrders.container";
import WarehousePage from "./src/project/dashboard/containers/pages/warehouse.container";
import CashPage from "./src/project/dashboard/containers/pages/cash.container";
import UsersCouriersPage from "./src/project/dashboard/containers/pages/usersCouriers.container";
import HomePage from "./src/project/dashboard/containers/pages/home.container";
import ProblemsPage from "./src/project/dashboard/containers/pages/problems.container";
import {loadState} from "./src/core/services/local_storage";

// Modals
import ProductsModals from "./src/project/dashboard/containers/modals/products.container";
import EcommerceModals from "./src/project/dashboard/containers/modals/ecommerce.container";
import OrdersModals from "./src/project/dashboard/containers/modals/orders.container";
import UsersCouriersModals from "./src/project/dashboard/containers/modals/couriers.container";
import WarehouseModals from "./src/project/dashboard/containers/modals/warehouse.container";
import CashModals from "./src/project/dashboard/containers/modals/cash.container";
import EcommerceLayout from "./src/project/dashboard/containers/layouts/ecommerce.container";



const loadStateDefault = loadState() ?? {
    userData: {}
};

const localState = {
    userData: loadStateDefault.userData,
};

const store = createStore(reducers, localState, applyMiddleware(thunkMiddleware, authMiddleware));

ReactDOM.render(
    <Provider store={store}>
        <Router history={history} >
            <Switch>
                <Route exact path={routes.ROUTE_TO_LOGIN_PAGE} component={LoginPage}/>
                <Route exact path={routes.ROUTE_TO_REGISTER_PAGE} render={() => <RegisterPage />}/>
                <Route exact path={routes.ROUTE_TO_DASHBOARD} render={() => <DashboardLayout Page={ActiveOrdersPage} Modals={OrdersModals} />} />
                <Route exact path={routes.ROUTE_TO_PRODUCTS} render={() => <DashboardLayout Page={ProductsPage} Modals={ProductsModals} />} />
                <Route exact path={routes.ROUTE_TO_ACTIVE_ORDERS} render={() => <DashboardLayout Page={ActiveOrdersPage} Modals={OrdersModals} />} />
                <Route exact path={routes.ROUTE_TO_USERS_COURIERS} render={() => <DashboardLayout Page={UsersCouriersPage} Modals={UsersCouriersModals} />} />
                <Route exact path={routes.ROUTE_TO_WAREHOUSE} render={() => <DashboardLayout Page={WarehousePage} Modals={WarehouseModals} />} />
                <Route exact path={routes.ROUTE_TO_CASH} render={() => <DashboardLayout Page={CashPage} Modals={CashModals} />} />
                <Route exact path={routes.ROUTE_TO_MAIN_PAGE} render={() => <EcommerceLayout Page={HomePage} Modals={EcommerceModals} />} />
                <Route exact path={routes.ROUTE_TO_PROBLEMS} render={() => <DashboardLayout Page={ProblemsPage} Modals={"awd"} />} />
            </Switch>
        </Router>
    </Provider>
    , document.getElementById('root')
);