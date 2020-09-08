import React, {useEffect, useState} from "react";
import DataTable from "react-data-table-component";
import {
    ORDER_STATUS_CANCELLED_BY_CUSTOMER, ORDER_STATUS_CANCELLED_BY_SELLER, ORDER_STATUS_DELIVERED,
    ORDER_STATUS_IN_DELIVERY,
    ORDER_STATUS_INITIATED, ORDER_STATUS_NOT_DELIVERED
} from "../constants/statuses.constant";
import {Order} from "../../models/order.model";

export const ProblemsTableComponent = ({getProblems, problems, user}) => {
    useEffect(() => {
        getProblems();
    }, []);

    return (
        <div className="card">
            <div className="card-header header-elements-inline">
                <h5 className="card-title">Инциденты</h5>
                <div className="header-elements">
                    <div className="list-icons">
                        <a className="list-icons-item" data-action="collapse"/>
                        <a className="list-icons-item" data-action="reload"/>
                    </div>
                </div>
            </div>

            <DataTable
                noHeader={true}
                persistTableHead={true}
                noDataComponent={<p className="p-3">Инцидентов пока не было</p>}
                data={problems.map(problem => ({
                    ...problem,
                    typeProcessed: {
                        "inventory": <span className="badge badge-warning">склад</span>,
                        "cash": <span className="badge badge-primary">касса</span>
                    }[problem.type],
                    dateProcessed: problem.date.getDate() + '/' + ((problem.date.getMonth() + 1).length === 1
                        ? '0' + (problem.date.getMonth() + 1)
                        : (problem.date.getMonth() + 1)) + '/' + problem.date.getFullYear()
                }))}
                defaultSortField="status"
                columns={[
                    {
                        name: "#",
                        selector: "id",
                        sortable: true,
                    },
                    {
                        name: "Подотчетное лицо",
                        selector: "courier.name",
                        sortable: true,
                        width: "350px"
                        //sortFunction: (rowA, rowB) => rowA.name.localeCompare(rowB.name)
                    },
                    {
                        name: "Тип",
                        selector: "typeProcessed",
                        sortable: true,
                        width: "250px",
                        sortFunction: (rowA, rowB) => rowA.type.localeCompare(rowB.type)
                    },
                    {
                        name: "Дата",
                        selector: "dateProcessed",
                        sortable: true,
                        width: "150px"
                        //sortFunction: (rowA, rowB) => rowA.price - rowB.price
                    },
                    {
                        name: "",
                        right: true,
                        selector: "actions",
                        sortable: false,
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