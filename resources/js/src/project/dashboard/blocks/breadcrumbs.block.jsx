import React from "react";

export const BreadcrumbsBlock = () => {
    return (
        <div className="breadcrumb-line breadcrumb-line-light header-elements-md-inline">
            <div className="d-flex">
                <div className="breadcrumb">
                    <a href="index.html" className="breadcrumb-item"><i className="icon-home2 mr-2"/> Home</a>

                </div>

                <a href="#" className="header-elements-toggle text-default d-md-none"><i className="icon-more"/></a>
            </div>

            {/*<div className="header-elements d-none">
                <div className="breadcrumb justify-content-center">
                    <a href="#" className="breadcrumb-elements-item">
                        <i className="icon-comment-discussion mr-2"/>
                        Support
                    </a>

                    <div className="breadcrumb-elements-item dropdown p-0">
                        <a href="#" className="breadcrumb-elements-item dropdown-toggle" data-toggle="dropdown">
                            <i className="icon-gear mr-2"/>
                            Settings
                        </a>
                    </div>
                </div>
            </div>*/}
        </div>
    )
}