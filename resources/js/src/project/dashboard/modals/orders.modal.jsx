import React, {useEffect, useState} from "react";
import SelectPicker from 'react-select'
import {USER_TYPE_COURIER, USER_TYPE_CUSTOMER, UserFactory} from "../../auth/models/user.model";
import DatePicker, {registerLocale} from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {ru} from 'date-fns/locale';
import cyrillicToTranslit from "cyrillic-to-translit-js";
import InputMask from "react-input-mask";
import * as constants from "../../auth/checkboxes.constant";
import {
    ORDER_STATUS_CANCELLED_BY_CUSTOMER,
    ORDER_STATUS_DELIVERED,
    ORDER_STATUS_IN_DELIVERY,
    ORDER_STATUS_INITIATED,
    ORDER_STATUS_NOT_DELIVERED
} from "../constants/statuses.constant";
import Cart from "../../orders/containers/cart.container";
import {VALUE_INDIVIDUAL} from "../../auth/checkboxes.constant";

registerLocale('ru', ru);

export const OrdersModal = ({pageData, getCustomers, customers, getCouriers, couriers, productsInCart, getProducts, setProductsInCart, getOrders, createOrder, updateOrder, order, createCustomer}) => {
    const [illegalFields, setIllegalFields] = useState([]);

    const [selectedCourier, setSelectedCourier] = useState(UserFactory.createUser({role_id: USER_TYPE_COURIER}));
    const [deliveryDate, setDeliveryDate] = useState(new Date());
    const [deliveryAddress, setDeliveryAddress] = useState("");
    const [selectedCustomer, setSelectedCustomer] = useState(UserFactory.createUser({role_id: USER_TYPE_CUSTOMER}));
    const [status, setStatus] = useState("init");

    const [selectedOrder, setSelectedOrder] = useState(order.id);

    const [newCustomerName, setNewCustomerName] = useState("");
    const [newCustomerPhone, setNewCustomerPhone] = useState("");
    const [newCustomerEmail, setNewCustomerEmail] = useState("");
    const [newCustomerOrgType, setNewCustomerOrgType] = useState(VALUE_INDIVIDUAL);

    const [pageEventNewCustomerAdded, setPageEventNewCustomerAdded] = useState(0);
    const [pageEventNewOrderAddedOrUpdated, setPageEventNewOrderAddedOrUpdated] = useState(0);

    const [isNewCustomerFormClicked, setIsNewCustomerFormClicked] = useState(false);

    useEffect(() => {
        getCustomers();
        getCouriers();

    }, []);

    useEffect(() => {
        if (pageEventNewCustomerAdded > 0)
            getCustomers().then(e => {
                setSelectedCustomer(e.message.find(c => c.email === newCustomerEmail)
                    ?? UserFactory.createUser({role_id: USER_TYPE_CUSTOMER}))
            });

    }, [pageEventNewCustomerAdded]);

    useEffect(() => {
        if (pageEventNewOrderAddedOrUpdated > 0)
            getOrders();
            getProducts();

    }, [pageEventNewOrderAddedOrUpdated]);

    useEffect(() => {
        setSelectedCustomer(customers.find(c => c.id === order.customer.id) ?? UserFactory.createUser({role_id: USER_TYPE_CUSTOMER}));
        setSelectedCourier(couriers.find(c => c.id === order.courier.id) ?? UserFactory.createUser({role_id: USER_TYPE_COURIER}));
        setDeliveryDate(order.deliveryDate);
        setDeliveryAddress(order.address);
        setStatus(order.status);
        setProductsInCart(order.cart);

    }, [selectedOrder]);

    useEffect(() => {
        setSelectedOrder(order);
    }, [pageData]);

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

        // If courier is not selected
        if (selectedCourier.id === 0)
            _illegalFields.push({
                label: "courier",
                msg: "Выберите, пожалуйста, курьера"
            });

        setIllegalFields(_illegalFields);

        showErrors(_illegalFields);

        if (_illegalFields.length === 0 && order.id === 0) {
            $("#create_order_modal").modal('hide');
            createOrder({
                cart: JSON.stringify(productsInCart),
                courier_id: selectedCourier.id,
                delivery_date: Math.floor(+deliveryDate / 1000),
                delivery_address: deliveryAddress,
                customer_id: selectedCustomer.id
            }).then(r => setPageEventNewOrderAddedOrUpdated(pageEventNewOrderAddedOrUpdated + 1));
        }

        if (_illegalFields.length === 0 && order.id !== 0) {
            $("#create_order_modal").modal('hide');
            updateOrder({
                id: order.id,
                cart: JSON.stringify(productsInCart),
                courier_id: selectedCourier.id,
                delivery_date: Math.floor(+deliveryDate / 1000),
                delivery_address: deliveryAddress,
                customer_id: selectedCustomer.id,
                status: status
            }).then(r => setPageEventNewOrderAddedOrUpdated(pageEventNewOrderAddedOrUpdated + 1));
        }
    }

    const validateNewCustomerForm = () => {
        const _illegalFields = [];

        // If name without space
        if (!newCustomerName.match(/[\S]+[\s]+[\S]+/gm))
            _illegalFields.push({
                label: "newCustomerName",
                msg: "Вы указали некорректную связку имя, фамилия, пожалуйста введите имя и фамилию покупателя"
            });

        // Check phone number on fullness
        if (newCustomerPhone.replace(/\D/gm, "").length < 10)
            _illegalFields.push({
                label: "newCustomerPhone",
                msg: "Пожалуйста, проверьте формат вашего номера"
            });

        // Check email for correctness
        if (!newCustomerEmail.match(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i))
            _illegalFields.push({
                label: "newCustomerEmail",
                msg: "Кажется вы ввели неправильно ваш email, проверьте, пожалуйста"
            });
        setIllegalFields(_illegalFields);

        showErrors(_illegalFields);

        if (_illegalFields.length === 0) {
            createCustomer({
                name: newCustomerName,
                email: newCustomerEmail,
                org_type_id: newCustomerOrgType,
                phone: newCustomerPhone
            }).then(r => setPageEventNewCustomerAdded(pageEventNewCustomerAdded + 1));
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

    const checkIt = (target) => {
        $(target).closest(".form-group").find(".uniform-checker span").removeClass("checked");

        if (target.checked)
            $(target).closest("span").addClass("checked");

        return setNewCustomerOrgType(target.value)
    }

    return (
        <>
            {/* Modal create product*/}
            <div className="modal fade" role="dialog" aria-hidden="true" id={"create_order_modal"}>
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h4 className="modal-title" id="exampleModalLabel">{order.id === 0
                                ? "Создание нового заказа"
                                : "Редактирование заказа"}</h4>

                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            {order.id === 0
                                ? <></>
                                : <div className="status">
                                    <div className="status_title">
                                        <h6>Статус заказа</h6>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-5">
                                            <SelectPicker
                                                placeholder="Введите статус"
                                                options={[
                                                    {label: "в обработке", value: ORDER_STATUS_INITIATED},
                                                    {label: "в доставке", value: ORDER_STATUS_IN_DELIVERY},
                                                    {label: "отменен", value: ORDER_STATUS_CANCELLED_BY_CUSTOMER},
                                                    {label: "доставлен", value: ORDER_STATUS_DELIVERED},
                                                    {label: "не доставлен", value: ORDER_STATUS_NOT_DELIVERED},
                                                ]}
                                                value={{label: {
                                                        [ORDER_STATUS_INITIATED]: "в обработке",
                                                        [ORDER_STATUS_IN_DELIVERY]: "в доставке",
                                                        [ORDER_STATUS_CANCELLED_BY_CUSTOMER]: "отменен",
                                                        [ORDER_STATUS_DELIVERED]: "доставлен",
                                                        [ORDER_STATUS_NOT_DELIVERED]: "не доставлен",
                                                    }[status], value: status}}
                                                onChange={e => setStatus(e.value)}
                                            />
                                        </div>
                                    </div>
                                </div>
                            }
                            <div className="customer">
                                <div className="row">
                                    <div className="col-md-5">
                                        <div className="customer_title">
                                            <h6>Покупатель</h6>
                                        </div>
                                        <SelectPicker
                                            placeholder="Введите Имя и Фамилию покупателя"
                                            options={customers.map(customer => ({
                                                label: customer.name,
                                                value: customer.id
                                            }))}
                                            value={selectedCustomer.id !== 0
                                                ? {
                                                    label: selectedCustomer.name,
                                                    value: selectedCustomer.id
                                                }
                                                : null
                                            }
                                            onChange={e => {
                                                customers.find(c => c.id === e.value)
                                                setSelectedCustomer(customers.find(c => c.id === e.value))
                                            }}
                                            noOptionsMessage={value =>
                                                <button className="form-control btn"
                                                        onClick={e => {
                                                            if (value.inputValue.match(/[\S]+[\s]+[\S]+/gm)) {
                                                                setIsNewCustomerFormClicked(true);
                                                                setNewCustomerName(value.inputValue);
                                                                setNewCustomerEmail(cyrillicToTranslit().transform(value.inputValue)
                                                                    .toLowerCase().replace(" ", ".") + "@armansu.kz");
                                                            }

                                                        }}>Добавить покупателя</button>}
                                        />
                                    </div>
                                    {isNewCustomerFormClicked
                                        ? <>
                                            <div className="col-md-6">
                                                <div className="new_customer_title">
                                                    <h6>Форма создания нового покупателя</h6>
                                                </div>
                                                <div
                                                    className="form-group form-group-feedback form-group-feedback-left">
                                                    <input value={newCustomerName} className="form-control"
                                                           placeholder={"Введите имя пользователя"}
                                                           onChange={e => setNewCustomerName(e.target.value)}/>
                                                    <div className="form-control-feedback">
                                                        <i className="icon-user text-muted"/>
                                                    </div>
                                                    <span className="form-text text-danger"
                                                          id={"newCustomerName-error"}/>
                                                </div>
                                                <div
                                                    className="form-group form-group-feedback form-group-feedback-left">
                                                    <input value={newCustomerEmail} className="form-control"
                                                           placeholder={"Введите электронную почту"}
                                                           onChange={e => setNewCustomerEmail(e.target.value)}/>
                                                    <div className="form-control-feedback">
                                                        <i className="icon-mention text-muted"/>
                                                    </div>
                                                    <span className="form-text text-danger"
                                                          id={"newCustomerEmail-error"}/>
                                                </div>
                                                <div
                                                    className="form-group form-group-feedback form-group-feedback-left">
                                                    <InputMask
                                                        mask="+7-(999)-999-99-99" maskChar={" "} type="text"
                                                        className="form-control" placeholder="Укажите номер телефона"
                                                        value={newCustomerPhone}
                                                        onChange={e => setNewCustomerPhone(e.target.value)}/>
                                                    <div className="form-control-feedback">
                                                        <i className="icon-phone2 text-muted"/>
                                                    </div>
                                                    <span className="form-text text-danger"
                                                          id={"newCustomerPhone-error"}/>
                                                </div>
                                                <div className="form-group">
                                                    <div className="row">
                                                        <div className="col-md-6">
                                                            <label className="form-check-label">
                                                                <div className="row">
                                                                    <div className="col-md-2">
                                                                        <div className="uniform-checker">
                                                                <span className={"checked"}>
                                                                    <input type="radio" name="organization_type"
                                                                           className="form-input-styled"
                                                                           value={constants.VALUE_INDIVIDUAL}
                                                                           checked={"checked"}
                                                                           onChange={e => checkIt(e.target)}/>
                                                                </span>
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-md-10">
                                                                        Физическое лицо
                                                                    </div>
                                                                </div>
                                                            </label>
                                                        </div>
                                                        <div className="col-md-6">
                                                            <label className="form-check-label">
                                                                <div className="row">
                                                                    <div className="col-md-2">
                                                                        <div className="uniform-checker">
                                                                <span>
                                                                    <input type="radio" name="organization_type"
                                                                           className="form-input-styled"
                                                                           value={constants.VALUE_LEGAL}
                                                                           onChange={e => checkIt(e.target)}/>
                                                                </span>
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-md-10">
                                                                        Юридическое лицо
                                                                    </div>
                                                                </div>
                                                            </label>
                                                        </div>
                                                    </div>
                                                    <span className="form-text text-danger"
                                                          id={"newCustomerOrganizationType-error"}/>
                                                </div>
                                                <div className="col-md-7 offset-5 text-right">
                                                    <button className="btn btn-outline btn-outline-success"
                                                            onClick={e => validateNewCustomerForm()}>
                                                        <i className="icon-user-plus"/> &nbsp; Сохранить пользователя
                                                    </button>
                                                </div>
                                            </div>
                                            <div className="col-md-1">
                                                <button className="btn text-danger-400"
                                                        onClick={e => setIsNewCustomerFormClicked(false)}>
                                                    <i className="icon-cross2"/></button>
                                            </div>
                                        </>
                                        : <></>}

                                    {selectedCustomer.id === 0
                                    ? <></>
                                    : <p>{console.log(selectedCustomer)}</p>
                                    }
                                </div>
                            </div>
                            <Cart />
                            <div className="delivery_details mt-4">
                                <h6>Детали доставки</h6>
                                <div className="row">
                                    <div className="col-md-5">
                                        <SelectPicker
                                            options={couriers.map(courier => ({
                                                label: courier.name,
                                                value: courier.id
                                            }))}
                                            value={selectedCourier.id === 0 ? null
                                                : {
                                                    label: selectedCourier.name,
                                                    value: selectedCourier.id
                                                }}
                                            placeholder={"Выберите курьера"}
                                            onChange={e => setSelectedCourier(couriers.find(courier => courier.id === e.value))}/>
                                        <span className="form-text text-danger" id={"courier-error"}/>
                                    </div>
                                    <div className="col-md-2">
                                        <DatePicker selected={deliveryDate} locale={"ru"} minDate={new Date()}
                                                    dateFormat={"dd MMMM"} className="order_delivery_datepicker"
                                                    onChange={date => setDeliveryDate(date)}/>
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
                            <button type="button" className="btn btn-primary"
                                    onClick={e => validatePageFields()}>{order.id === 0 ? "Создать заказ" : "Обновить заказ"}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}