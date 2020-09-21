import React, {useEffect, useState} from "react";
import DataTable from 'react-data-table-component';


export const WarehouseTableComponent = ({getInventoryReports, reports, products, setCurrentCourierId, setCart, setReportSuccess, setReportFail}) => {
    const today = new Date();

    const [pageEventReportUpdated, setPageEventReportUpdated] = useState(0);

    useEffect(() => {
        getInventoryReports();
    }, [pageEventReportUpdated]);

    return (
        <div className="card">
            <div className="card-header header-elements-inline">
                <h5 className="card-title">Подотчетные лица на {today.getDate() + "." + (today.getMonth() + 1)} по
                    товарам</h5>
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
                data={reports.map(c => ({
                    name: c.courier.name,
                    inventoryAtBeginning: c.inventoryAtBeginning,
                    inventoryAtBeginningProcessed: <>
                        {c.inventoryAtBeginning.map((product, key) => (
                            <p key={key}>{product.product_name} - {product.product_volume} л. x {product.amount}</p>
                        ))}
                    </>,
                    inventoryDuringDay: c.inventoryDuringDay,
                    inventoryDuringDayProcessed: c.inventoryDuringDay.map((product, key) => (
                        <p key={key}>{product.product_name} - {product.product_volume} л.
                            х {product.amount_ordered}</p>
                    )),
                    // Предполагается, что на начало дня товара больше, чем заказов у курьера
                    inventoryAtEnd: c.inventoryAtBeginning.map((product, key) => (
                        <p key={key}>{product.product_name} - {product.product_volume} л. x {product.amount -
                        (c.inventoryDuringDay.find(inv => inv.product_id === product.product_id)
                            ? c.inventoryDuringDay
                                .find(inv => inv.product_id === product.product_id).amount_ordered
                            : 0)}</p>
                    )),
                    statusProcessed: {
                        "empty": <span className="badge badge-warning">Укажите товары</span>,
                        "beginning": <span className="badge badge-primary">Не проверен</span>,
                        "success": <span className="badge badge-success">Совпадает</span>,
                        "problem": <span className="badge badge-danger">Не совпадает</span>
                    }[c.status],
                    actionsProcessed: c.inventoryReportId !== 0
                        ? <>
                            <button className="btn text-danger-400" onClick={e => {
                                setReportFail(c.inventoryReportId).then(e => setPageEventReportUpdated(pageEventReportUpdated + 1));
                            }}><i className="icon-cross2"/></button>
                            <button className="btn text-success-400" onClick={e => {
                                setReportSuccess(c.inventoryReportId).then(e => setPageEventReportUpdated(pageEventReportUpdated + 1));
                            }}><i className="icon-check2"/></button>
                            <button className="btn text-primary-400" onClick={e => {
                                $("#warehouse_modal").modal('show');
                                setCart(products.filter(product => c.inventoryAtBeginning.some(p => p.product_id === product.id)));
                                setCurrentCourierId(c.id);
                            }}><i className="icon-pencil3"/></button>
                        </>
                        : <>
                            <button className="btn text-primary-400" onClick={e => {
                                $("#warehouse_modal").modal('show');
                                setCart(products.filter(product => c.inventoryAtBeginning.some(p => p.product_id === product.id)));
                                setCurrentCourierId(c.id);
                            }}><i className="icon-pencil3"/></button></>
                }))}
                columns={[
                    {
                        name: "Подотчетное лицо",
                        selector: "name",
                        sortable: true,
                        width: "250px"
                    },
                    {
                        name: "Начало дня",
                        selector: "inventoryAtBeginningProcessed",
                        sortable: true,
                        width: "200px"
                    },
                    {
                        name: "В течение дня",
                        selector: "inventoryDuringDayProcessed",
                        sortable: true,
                        width: "200px"
                    },
                    {
                        name: "Должно быть на конец дня",
                        selector: "inventoryAtEnd",
                        sortable: true,
                        width: "200px"
                    },
                    {
                        name: "",
                        selector: "statusProcessed",
                        sortable: true,
                    },
                    {
                        name: "",
                        right: true,
                        selector: "actionsProcessed",
                        sortable: false,
                        width: "200px"
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