import React from "react";

export const TitleBlock = () => {
    return (
        <div className="page-header-content header-elements-md-inline">
            <div className="page-title d-flex">
                <h4><i className="icon-arrow-left52 mr-2"/> <span className="font-weight-semibold">Armansu</span>
                    &nbsp; админ панель</h4>
                <a href="#" className="header-elements-toggle text-default d-md-none">
                    <i className="icon-more"/>
                </a>
            </div>

            {/*<div className="header-elements d-none">
                <div className="d-flex justify-content-center">
                    <a href="#" className="btn btn-link btn-float text-default">
                        <i className="icon-bars-alt text-primary"/><span>Statistics</span>
                    </a>
                    <a href="#" className="btn btn-link btn-float text-default">
                        <i className="icon-calculator text-primary"/> <span>Invoices</span>
                    </a>
                    <a href="#" className="btn btn-link btn-float text-default">
                        <i className="icon-calendar5 text-primary"/> <span>Schedule</span>
                    </a>
                </div>
            </div>*/}
        </div>
    )
}