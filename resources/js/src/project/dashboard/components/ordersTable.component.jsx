import React, {useEffect, useState} from "react";
import DataTable from "react-data-table-component";
import {
    ORDER_STATUS_CANCELLED_BY_CUSTOMER, ORDER_STATUS_CANCELLED_BY_SELLER, ORDER_STATUS_DELIVERED,
    ORDER_STATUS_IN_DELIVERY,
    ORDER_STATUS_INITIATED, ORDER_STATUS_NOT_DELIVERED
} from "../constants/statuses.constant";
import {Order} from "../../models/order.model";

export const OrdersTableComponent = ({getOrders, orders, setCurrentOrder, user}) => {
    const [search, setSearch] = useState("");

    useEffect(() => {
        getOrders();

        setInterval(function(){ getOrders(); }, 5 * 60 * 1000);
    }, []);

    return (
        <div className="card">
            <div className="card-header header-elements-inline">
                <h5 className="card-title">Активные заказы</h5>
                <div className="header-elements">
                    <div className="list-icons">
                        <a className="list-icons-item" data-action="collapse"/>
                        <a className="list-icons-item" data-action="reload"/>
                    </div>
                </div>
            </div>

            <div className="datatable-header">
                {user.isSeller()
                    ?  <div className="dt-buttons">
                        <button className="dt-button btn bg-teal-400" type="button"
                                onClick={e => {
                                    setCurrentOrder(new Order());
                                    $("#create_order_modal").modal('show')
                                }}>
                            <span>Создать новый заказ</span>
                        </button>
                    </div>
                    : <></>}
            </div>

            <DataTable
                noHeader={true}
                persistTableHead={true}
                noDataComponent={<p className="p-3">{user.isCustomer() ? "У вас нет заказов" : "В системе еще нет заказов"}</p>}
                data={orders.map(order => ({
                    id: order.id,
                    address: order.address,
                    courier: order.courier.name,
                    processedCart: order.cart.map((product, key) => (
                        <p className="mt-1" key={key}>{product.name} ({product.volume} л.) x {product.amount} шт. по {product.price} тг</p>
                    )),
                    totalPrice: order.cart.reduce((accum, next) => accum + next.price * next.amount, 0),
                    status: {
                        [ORDER_STATUS_INITIATED]: 1,
                        [ORDER_STATUS_IN_DELIVERY]: 2,
                        [ORDER_STATUS_CANCELLED_BY_CUSTOMER]: 3,
                        [ORDER_STATUS_CANCELLED_BY_SELLER]: 4,
                        [ORDER_STATUS_DELIVERED]: 5,
                        [ORDER_STATUS_NOT_DELIVERED]: 6
                    }[order.status],
                    processedStatus: <span className={{
                        [ORDER_STATUS_INITIATED]: "bg-primary-300 text-blue",
                        [ORDER_STATUS_IN_DELIVERY]: "bg-orange-400 text-white",
                        [ORDER_STATUS_CANCELLED_BY_CUSTOMER]: "bg-info-700 text-white",
                        [ORDER_STATUS_CANCELLED_BY_SELLER]: "bg-blue-400 text-white",
                        [ORDER_STATUS_DELIVERED]: "bg-success text-white",
                        [ORDER_STATUS_NOT_DELIVERED]: "bg-danger-400 text-white"
                    }[order.status] + " d-inline-block p-1"}>{{
                        [ORDER_STATUS_INITIATED]: "в обработке",
                        [ORDER_STATUS_IN_DELIVERY]: "в доставке",
                        [ORDER_STATUS_CANCELLED_BY_CUSTOMER]: "отменен",
                        [ORDER_STATUS_CANCELLED_BY_SELLER]: "отменен админом",
                        [ORDER_STATUS_DELIVERED]: "доставлен",
                        [ORDER_STATUS_NOT_DELIVERED]: "проблема"
                    }[order.status]}</span>,
                    actions: <>
                        <button className="text-primary-400 btn"
                                onClick={() => {
                                    setCurrentOrder(order);
                                    $("#create_order_modal").modal('show');
                                }}><i className="icon-pencil" /></button>
                    </>
                }))}
                defaultSortField="status"
                columns={[
                    {
                        name: "#",
                        selector: "id",
                        sortable: true,
                        width: "70px"
                    },
                    {
                        name: "Адрес заказа",
                        selector: "address",
                        sortable: true,
                        //width: "250px"
                        //sortFunction: (rowA, rowB) => rowA.name.localeCompare(rowB.name)
                    },
                    {
                        name: "Курьер",
                        selector: "courier",
                        sortable: true,
                        //width: "150px"
                        //sortFunction: (rowA, rowB) => rowA.volume - rowB.volume
                    },
                    {
                        name: "Заказ",
                        selector: "processedCart",
                        sortable: false,
                        //width: "350px"
                        //sortFunction: (rowA, rowB) => rowA.price - rowB.price
                    },
                    {
                        name: "Общая стоимость",
                        selector: "totalPrice",
                        right: true,
                        sortable: true,
                        //width: "150px"
                        //sortFunction: (rowA, rowB) => rowA.amount - rowB.amount
                    },
                    {
                        name: "Статус",
                        selector: "processedStatus",
                        sortable: true,
                        width: "150px",
                        sortFunction: (rowA, rowB) =>  rowA.status - rowB.status
                    },
                    {
                        name: "",
                        right: true,
                        selector: "actions",
                        sortable: false,
                        width: "100px"
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