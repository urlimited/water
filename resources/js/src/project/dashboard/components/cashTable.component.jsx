import React, {useEffect, useState} from "react";
import DataTable from 'react-data-table-component';


export const CashTableComponent = ({cashReports, setCashReportSuccess, setCashReportFail, getCashReports, setCurrentCourierId}) => {
    const today = new Date();

    const [pageEventReportUpdated, setPageEventReportUpdated] = useState(0);

    useEffect(() => {
        getCashReports();
    }, [pageEventReportUpdated]);

    return (
        <div className="card">
            <div className="card-header header-elements-inline">
                <h5 className="card-title">Подотчетные лица на {today.getDate() + "." + (today.getMonth() + 1)} по
                    кассе</h5>
                <div className="header-elements">
                    <div className="list-icons">
                        <a className="list-icons-item" data-action="collapse"/>
                        <a className="list-icons-item" data-action="reload"/>
                    </div>
                </div>
            </div>

            <DataTable
                persistTableHead={true}
                noHeader={true}
                data={cashReports.map(report => ({
                    name: report.courier.name,
                    cashAtBeginning: report.cashAtBeginning,
                    cashDuringDay: report.cashDuringDay,
                    ordersDuringDay: report.ordersDuringDay,
                    cashAtEnd: report.cashAtBeginning + report.cashDuringDay,
                    statusProcessed: {
                        "empty": <span className="badge badge-warning">Укажите кассу</span>,
                        "beginning": <span className="badge badge-primary">Не проверен</span>,
                        "success": <span className="badge badge-success">Совпадает</span>,
                        "problem": <span className="badge badge-danger">Не совпадает</span>
                    }[report.status],
                    actionsProcessed: report.cashReportId !== 0
                        ? <>
                            <button className="btn text-danger-400" onClick={e => {
                                setCashReportFail(report.cashReportId).then(e => setPageEventReportUpdated(pageEventReportUpdated + 1));
                            }}><i className="icon-cross2"/></button>
                            <button className="btn text-success-400" onClick={e => {
                                setCashReportSuccess(report.cashReportId).then(e => setPageEventReportUpdated(pageEventReportUpdated + 1));
                            }}><i className="icon-check2"/></button>
                            <button className="btn text-primary-400" onClick={e => {
                                $("#cash_modal").modal('show');
                                //setCart(products.filter(product => c.inventoryAtBeginning.some(p => p.product_id === product.id)));
                                setCurrentCourierId(report.id);
                            }}><i className="icon-pencil3"/></button>
                        </>
                        : <>
                            <button className="btn text-primary-400" onClick={e => {
                                $("#cash_modal").modal('show');
                                //setCart(products.filter(product => c.inventoryAtBeginning.some(p => p.product_id === product.id)));
                                setCurrentCourierId(report.id);
                            }}><i className="icon-pencil3"/></button></>
                }))}
                columns={[
                    {
                        name: "Подотчетное лицо",
                        selector: "name",
                        sortable: true,
                        width: "150px"
                    },
                    {
                        name: "На начало дня",
                        selector: "cashAtBeginning",
                        sortable: true,
                        right: true
                    },
                    {
                        name: "В течение дня",
                        selector: "cashDuringDay",
                        sortable: true,
                        right: true
                    },
                    {
                        name: "На конец дня",
                        selector: "cashAtEnd",
                        sortable: true,
                        right: true
                    },
                    {
                        name: "",
                        selector: "statusProcessed",
                        sortable: false,
                    },
                    {
                        name: "",
                        selector: "actionsProcessed",
                        sortable: false,
                        width: "170px"
                    },
                ]}
                pagination={true}
                paginationComponentOptions={{
                    rowsPerPageText: 'Записей на странице:',
                    rangeSeparatorText: 'из',
                    noRowsPerPage: true,
                    selectAllRowsItem: false,
                    selectAllRowsItemText: 'All'
                }}
            />
        </div>
    )
}