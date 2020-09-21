import React, {useEffect, useState} from "react";
import NumberFormat from 'react-number-format';

export const ProductsModal = ({createProduct, getProducts, updateProduct, deleteProduct, product}) => {
    const [volume, setVolume] = useState(0);
    const [name, setName] = useState("");
    const [price, setPrice] = useState(0);
    const [color, setColor] = useState("#f6b73c");
    const [amount, setAmount] = useState(0);

    const [pageEventProductAdded, setPageEventProductAdded] = useState(0);
    const [pageEventProductUpdated, setPageEventProductUpdated] = useState(0);
    const [pageEventProductDeleted, setPageEventProductDeleted] = useState(0);

    const [illegalFields, setIllegalFields] = useState([]);

    useEffect(() => {
        setVolume(product.volume);
        setName(product.name);
        setPrice(product.price);
        setColor(product.color);
        setAmount(product.amount);
    }, [product])

    const validatePageFields = () => {
        const _illegalFields = [];

        // Empty check
        [
            {label: "name", value: name},
        ].forEach(field => {
            if (field.value === "")
                _illegalFields.push({label: field.label, msg: "Заполните, пожалуйста это поле"});
        });

        // If price is less or equals to 0
        if (price <= 0)
            _illegalFields.push({
                label: "price",
                msg: "Цена товара должна быть больше 0"
            });

        // If volume is less or equals to 0
        if (volume <= 0)
            _illegalFields.push({
                label: "volume",
                msg: "Объем должен быть больше 0"
            });

        setIllegalFields(_illegalFields);

        showErrors(_illegalFields)

        if (_illegalFields.length === 0 && product.id === 0)
            createProduct({name, volume, price, color, amount})
                .then(e => {
                    setPageEventProductAdded(pageEventProductAdded + 1);
                });

        if (_illegalFields.length === 0 && product.id !== 0)
            updateProduct({id: product.id, name, volume, price, color, amount})
                .then(e => {
                    setPageEventProductUpdated(pageEventProductUpdated + 1);
                });

        if (_illegalFields.length === 0)
            $("#create_product_modal").modal('hide');

    }

    const showErrors = (errors) => {
        ["name", "volume", "price", "color", "amount"]
            .forEach(id => $(`#${id}-error`).hide());

        // Show only illegal fields errors
        errors.forEach(error => {
            const element = $(`#${error.label}-error`);
            element.html(`<i class="icon-cancel-circle2 mr-2"/> ${error.msg}`);
            element.show();
        })
    }

    useEffect(() => {
            getProducts({key: "val"});
        }, [pageEventProductAdded, pageEventProductUpdated, pageEventProductDeleted]
    );


    return (
        <>
            {/* Modal create product*/}
            <div className="modal fade" role="dialog" aria-hidden="true" id={"create_product_modal"}>
                <div className="modal-dialog modal-sm">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Создание нового товара</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <div className="form-group">
                                <div className="row">
                                    <div className="col-md-5">
                                        <label htmlFor="product_title" className="col-form-label">Название
                                            товара:</label>
                                    </div>
                                    <div className="col-md-7">
                                        <input type="text" className="form-control" id="product_title" maxLength="25"
                                               value={name} onChange={e => setName(e.target.value)}/>
                                    </div>
                                </div>
                                <span className="form-text text-danger" id={"name-error"}/>
                            </div>
                            <div className="form-group">
                                <div className="row">
                                    <div className="col-md-5">
                                        <label htmlFor="product_volume" className="col-form-label">Объем:</label>
                                    </div>
                                    <div className="col-md-7">
                                        <NumberFormat className="form-control text-right" id="product_volume"
                                                      thousandSeparator={" "} suffix={" л."}
                                                      value={volume} onValueChange={e => setVolume(e.value)}/>
                                    </div>
                                </div>
                                <span className="form-text text-danger" id={"volume-error"}/>
                            </div>
                            <div className="form-group">
                                <div className="row">
                                    <div className="col-md-5">
                                        <label htmlFor="product_price" className="col-form-label">Цена:</label>
                                    </div>
                                    <div className="col-md-7">
                                        <NumberFormat className="form-control text-right" id="product_price"
                                                      thousandSeparator={" "} suffix={" тг."} value={price}
                                                      onValueChange={e => setPrice(e.value)}/>
                                    </div>
                                </div>
                                <span className="form-text text-danger" id={"price-error"}/>
                            </div>

                            <div className="form-group">
                                <div className="row">
                                    <div className="col-md-5">
                                        <label htmlFor="product_amount" className="col-form-label">Количество:</label>
                                    </div>
                                    <div className="col-md-7">
                                        <NumberFormat className="form-control text-right" id="product_amount"
                                                      thousandSeparator={" "} suffix={" шт."} value={amount}
                                                      onValueChange={e => setAmount(e.value)}/>
                                    </div>
                                </div>
                            </div>

                            <div className="form-group">
                                <div className="row">
                                    <div className="col-md-5">
                                        <label htmlFor="product_price" className="col-form-label">Цвет иконки:</label>
                                    </div>
                                    <div className="col-md-7">
                                        <input type="color" className="form-control text-right" id="product_price"
                                               value={color} onChange={e => setColor(e.target.value)}/>
                                    </div>
                                </div>
                                <span className="form-text text-danger" id={"color-error"}/>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Отмена</button>
                            <button type="button" className="btn btn-primary"
                                    onClick={e => validatePageFields()}>Сохранить
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Modal product delete warning */}
            <div className="modal fade" role="dialog" aria-hidden="true" id={"product_delete_modal"}>
                <div className="modal-dialog modal-sm">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Вы точно хотите удалить этот товар ?</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <p>Заказы покупателей подвязаны к товарам, данный товар подвязан к базе данных. Если вы
                                хотите просто поменять поля у этого товара, воспользуйтесь кнопкой редактирования</p>
                            <p><b>Удаляйте товар только в том случае, если больше не будете поставлять этот товар на
                                склад</b></p>

                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Я передумал(а)
                            </button>
                            <button type="button" className="btn btn-danger" data-dismiss="modal"
                                    onClick={e => {
                                        deleteProduct({id: product.id})
                                            .then(e => setPageEventProductDeleted(pageEventProductDeleted + 1));
                                    }}>Удалить
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}