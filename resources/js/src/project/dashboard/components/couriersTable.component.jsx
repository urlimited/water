import React, {useEffect, useState} from "react";
import DataTable from 'react-data-table-component';


export const CouriersTableComponent = ({couriers}) => {
    const [search, setSearch] = useState("");

    return (
        <div className="card">
            <div className="card-header header-elements-inline">
                <h5 className="card-title">Список всех курьеров</h5>
                <div className="header-elements">
                    <div className="list-icons">
                        <a className="list-icons-item" data-action="collapse"/>
                        <a className="list-icons-item" data-action="reload"/>
                    </div>
                </div>
            </div>

            <div className="datatable-header">
                <div className="dt-buttons">
                    <button className="dt-button btn bg-teal-400" type="button"
                            onClick={e => {
                                $("#create_courier_modal").modal('show')
                            }}>
                        <span>Зарегистрировать нового курьера</span>
                    </button>
                </div>

            </div>

            <DataTable
                persistTableHead={true}
                noHeader={true}
                data={couriers.map(c => ({
                    ...c,
                    actions: <div className="text-right">
                        <button className="btn" onClick={e => {
                            setCurrentProduct(product.id);
                            $("#create_product_modal").modal('show');
                        }}>
                            <i className="icon-pencil text-blue-400"/>
                        </button>
                        <button className="btn" onClick={e => {
                            setCurrentProduct(product.id);
                            $("#product_delete_modal").modal('show')
                        }}>
                            <i className="icon-bin text-danger-400"/>
                        </button>
                    </div>
                }))}
                columns={[
                    {
                        name: "Полное имя",
                        selector: "name",
                        sortable: true,
                    },
                    {
                        name: "Контактные данные",
                        selector: "phone",
                        sortable: true,
                    },
                    {
                        name: "",
                        selector: "actions",
                        sortable: false,
                        right: true
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