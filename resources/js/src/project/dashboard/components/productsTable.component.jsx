import React, {useEffect, useState} from "react";
import DataTable from 'react-data-table-component';


export const ProductsTableComponent = ({products, setCurrentProduct}) => {
    const [search, setSearch] = useState("");

    return (
        <div className="card">
            <div className="card-header header-elements-inline">
                <h5 className="card-title">Список всех товаров с розничными ценами</h5>
                <div className="header-elements">
                    <div className="list-icons">
                        <a className="list-icons-item" data-action="collapse"/>
                        <a className="list-icons-item" data-action="reload"/>
                    </div>
                </div>
            </div>

            <div className="datatable-header">
                <div id="DataTables_Table_1_filter" className="dataTables_filter">
                    <label><span>Поиск:</span>
                        <input type="search" className="" placeholder="Начните печатать..."
                               value={search} onChange={e => setSearch(e.target.value)}/>
                    </label></div>
                <div className="dt-buttons">
                    <button className="dt-button btn bg-teal-400" type="button"
                            onClick={e => {
                                setCurrentProduct(0);
                                $("#create_product_modal").modal('show')
                            }}>
                        <span>Создать новый товар</span>
                    </button>
                </div>

            </div>

            <DataTable
                noHeader={true}
                data={products
                    .filter(product => product.name.toLowerCase().includes(search.toLowerCase()))
                    .map(product => ({
                        id: product.id,
                        name: product.name,
                        nameProcessed: <p><i className="icon-square"
                                             style={{color: product.color}}/> {product.name} - {product.volume} л.</p>,
                        price: product.price,
                        priceProcessed: <p>{product.price + " тг."}</p>,
                        volume: product.volume,
                        volumeProcessed: <p>{product.volume} л.</p>,
                        amount: product.amount,
                        amountProcessed: <p>{product.amount} шт.</p>,
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
                    }))
                }
                columns={[
                    {
                        name: "Номер товара",
                        selector: "id",
                        sortable: true,
                        width: "150px"
                    },
                    {
                        name: "Название товара",
                        selector: "nameProcessed",
                        sortable: true,
                        sortFunction: (rowA, rowB) => rowA.name.localeCompare(rowB.name)
                    },
                    {
                        name: "Объем",
                        selector: "volumeProcessed",
                        sortable: true,
                        sortFunction: (rowA, rowB) => rowA.volume - rowB.volume
                    },
                    {
                        name: "Цена",
                        selector: "priceProcessed",
                        sortable: true,
                        sortFunction: (rowA, rowB) => rowA.price - rowB.price
                    },
                    {
                        name: "Количество на складе",
                        selector: "amountProcessed",
                        sortable: true,
                        sortFunction: (rowA, rowB) => rowA.amount - rowB.amount
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