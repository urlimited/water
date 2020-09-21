import React from "react";

export const HeaderBlock = ({user, logout}) => {
    return (
        <div className="navbar navbar-expand-md navbar-dark">
            <div className="navbar-brand">
                <a href="index.html" className="d-inline-block">
                    <img src="../../../../global_assets/images/logo_light.png" alt=""/>
                </a>
            </div>

            <div className="d-md-none">
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbar-mobile">
                    <i className="icon-tree5"></i>
                </button>
                <button className="navbar-toggler sidebar-mobile-main-toggle" type="button">
                    <i className="icon-paragraph-justify3"></i>
                </button>
            </div>

            <div className="collapse navbar-collapse" id="navbar-mobile">
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <a href="#" className="navbar-nav-link sidebar-control sidebar-main-toggle d-none d-md-block">
                            <i className="icon-paragraph-justify3"></i>
                        </a>
                    </li>
                </ul>

                <span className="badge bg-success ml-md-3 mr-md-auto">Online</span>

                <ul className="navbar-nav">

                    <li className="nav-item dropdown dropdown-user">
                        <a href="#" className="navbar-nav-link d-flex align-items-center dropdown-toggle"
                           data-toggle="dropdown">
                            <span>{user.name}</span>
                        </a>

                        <div className="dropdown-menu dropdown-menu-right">
                            <button className="dropdown-item" onClick={e => logout()}><i className="icon-switch2"></i> Выйти</button>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    )
}