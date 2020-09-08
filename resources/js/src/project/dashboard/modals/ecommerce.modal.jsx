import React, {useEffect, useState} from "react";
import DatePicker, {registerLocale} from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {ru} from 'date-fns/locale';

import Cart from "../../orders/containers/cart.container";

registerLocale('ru', ru);

export const EcommerceModal = ({productsInCart, createOrder, order, user}) => {
    const [illegalFields, setIllegalFields] = useState([]);

    const [deliveryDate, setDeliveryDate] = useState(new Date());
    const [deliveryAddress, setDeliveryAddress] = useState(user.address);

    useEffect(() => {
        setDeliveryAddress(user.address);
    }, [user]);

    const validatePageFields = () => {
        const _illegalFields = [];

        // If cart is empty
        if (productsInCart.length === 0)
            _illegalFields.push({
                label: "cart",
                msg: "Ваша корзина пуста, добавьте товары в корзину"
            });

        // If address is empty
        if (deliveryAddress === "")
            _illegalFields.push({
                label: "address",
                msg: "Укажите, пожалуйста, адрес доставки"
            });

        setIllegalFields(_illegalFields);

        showErrors(_illegalFields);

        if (_illegalFields.length === 0) {
            $("#create_order_modal").modal('hide');
            createOrder({
                cart: JSON.stringify(productsInCart),
                delivery_date: Math.floor(+deliveryDate / 1000),
                delivery_address: deliveryAddress,
            }).then(r => {
                if(r.status === 200)
                    $("#order_successful_modal").modal('show');
            })

        }
    }

    const showErrors = (errors) => {
        ["cart", "address", "courier", "customerName", "newCustomerName", "newCustomerEmail", "newCustomerPhone"]
            .forEach(id => $(`#${id}-error`).hide());

        // Show only illegal fields errors
        errors.forEach(error => {
            const element = $(`#${error.label}-error`);
            element.html(`<i class="icon-cancel-circle2 mr-2"/> ${error.msg}`);
            element.show();
        });
    }

    return (
        <>
            {/* Modal new order */}
            <div className="modal fade" role="dialog" aria-hidden="true" id={"create_order_modal"}>
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h4 className="modal-title" id="exampleModalLabel">Оформите ваш заказ</h4>

                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <Cart />
                            <div className="delivery_details mt-4">
                                <h6>Детали доставки</h6>
                                <div className="row">
                                    <div className="col-md-3">
                                        <p className="pt-1">Укажите дату доставки</p>
                                    </div>
                                    <div className="col-md-2">
                                        <DatePicker selected={deliveryDate} locale={"ru"} minDate={new Date()}
                                                    dateFormat={"dd MMMM"} className="order_delivery_datepicker"
                                                    onChange={date => setDeliveryDate(date)}/>
                                    </div>
                                </div>
                                <div className="row mt-2">
                                    <div className="col-md-3">
                                        <p className="pt-1">Укажите адрес доставки</p>
                                    </div>
                                    <div className="col-md-5">
                                        <div className="form-group form-group-feedback form-group-feedback-left">
                                            <input value={deliveryAddress} className="form-control"
                                                   placeholder={"Введите адрес"}
                                                   onChange={e => setDeliveryAddress(e.target.value)}/>
                                            <div className="form-control-feedback">
                                                <i className="icon-location3 text-muted"/>
                                            </div>
                                            <span className="form-text text-danger" id={"address-error"}/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Отмена</button>
                            <button type="button" className="get-started-btn b-0"
                                    onClick={e => validatePageFields()}>Заказать
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Modal order successfully in database */}
            <div className="modal fade" role="dialog" aria-hidden="true" id={"order_successful_modal"}>
                <div className="modal-dialog modal-sm">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h4 className="modal-title" id="exampleModalLabel">Спасибо за ваш заказ</h4>

                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <p>Большое спасибо за ваш заказ, в ближайшее время наш оператор свяжется с вами, чтобы подтвердить заказ</p>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="get-started-btn b-0" data-dismiss="modal">Хорошо</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}