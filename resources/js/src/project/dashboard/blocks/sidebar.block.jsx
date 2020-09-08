import React, {useEffect} from "react";
import * as routes from "../../routes";
import {Link} from "react-router-dom";
import {NotLoadedUser} from "../../auth/models/user.model";

export const SidebarBlock = ({user, initSidebar}) => {
    useEffect(() => {
        if (!(user instanceof NotLoadedUser))
            initSidebar();
    }, [user])

    return (
        <div className="sidebar sidebar-dark sidebar-main sidebar-expand-md">

            <div className="sidebar-mobile-toggler text-center">
                <a href="#" className="sidebar-mobile-main-toggle">
                    <i className="icon-arrow-left8"/>
                </a>
                Navigation
                <a href="#" className="sidebar-mobile-expand">
                    <i className="icon-screen-full"/>
                    <i className="icon-screen-normal"/>
                </a>
            </div>


            <div className="sidebar-content">

                <div className="sidebar-user">
                    <div className="card-body">
                        <div className="media">
                            <div className="mr-3">
                                <a href="#">
                                    <img src="" className="rounded-circle" alt="" width="38" height="38"/>
                                </a>
                            </div>

                            <div className="media-body">
                                <div className="media-title font-weight-semibold">{user.name}</div>
                                {/*<div className="font-size-xs opacity-50">
                                    <i className="icon-pin font-size-sm"/> &nbsp;{user.address}
                                </div>*/}
                            </div>
                        </div>
                    </div>
                </div>


                <div className="card card-sidebar-mobile">
                    <ul className="nav nav-sidebar" data-nav-type="accordion">
                        <li className="nav-item-header">
                            <div className="text-uppercase font-size-xs line-height-xs">Модули</div>
                            <i className="icon-menu" title="Main"/>
                        </li>
                        {user.isSeller()
                            ? <li className="nav-item">
                                <Link to={routes.ROUTE_TO_DASHBOARD} className="nav-link">
                                    <i className="icon-home4"/>
                                    <span>Заказы</span>
                                </Link>
                            </li>
                            : <></>
                        }


                        {user.isSeller()

                            ? <li className="nav-item">
                                <Link to={routes.ROUTE_TO_PRODUCTS} className="nav-link">
                                    <i className="icon-copy"/><span>Товары</span>

                                </Link>
                            </li>
                            : <></>}

                        {/*{user.isSeller()
                            ? <li className="nav-item">
                                <Link to={routes.ROUTE_TO_USERS_COURIERS} className="nav-link">
                                    <i className="icon-users"/><span>Курьеры</span>

                                </Link>
                            </li>
                            : <></>}*/}

                        {(user.isSeller() || user.isWarehouser())
                            ? <li className="nav-item">
                                <Link to={routes.ROUTE_TO_WAREHOUSE} className="nav-link">
                                    <i className="icon-home"/><span>Склад</span>
                                </Link>
                            </li>
                            : <></>}

                        {(user.isSeller() || user.isCashier())
                            ? <li className="nav-item">
                                <Link to={routes.ROUTE_TO_CASH} className="nav-link">
                                    <i className="icon-cash2"/><span>Касса</span>
                                </Link>
                            </li>
                            : <></>}

                        {(user.isSeller())
                            ? <li className="nav-item">
                                <Link to={routes.ROUTE_TO_PROBLEMS} className="nav-link">
                                    <i className="icon-users"/><span>Инциденты</span>
                                </Link>
                            </li>
                            : <></>}

                        {/*{user.isSeller()
                            ? <li className="nav-item">
                                <Link to={routes.ROUTE_TO_ACTIVE_ORDERS} className="nav-link">
                                    <i className="icon-cube4"/><span>Заказы</span>
                                    <span className="badge bg-warning-300 align-self-center ml-auto">dev</span>
                                </Link>
                            </li>
                            : <></>}*/}

                        {/*<li className="nav-item nav-item-submenu">
                            <a className="nav-link"><i className="icon-copy"/> <span>Отчеты</span></a>

                            <ul className="nav nav-group-sub" data-submenu-title="reports">
                                <Link to="adww" className="nav-link">
                                    <span>Главная страница</span>
                                </Link>
                                <li className="nav-item">
                                    <a href={routes.ROUTE_TO_DASHBOARD} className="nav-link">
                                        <span className="badge bg-transparent align-self-center ml-auto">Все мои покупки</span>
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a href={routes.ROUTE_TO_DASHBOARD} className="nav-link disabled">
                                        <span className="badge bg-transparent align-self-center ml-auto">Все заказы</span>
                                    </a>
                                </li>
                            </ul>
                        </li>*/}
                    </ul>
                </div>
            </div>
        </div>
    )
}