import React, {useState, useEffect} from "react";
import * as constants from "../checkboxes.constant";
import InputMask from "react-input-mask";
import RegisterContainer from "../../../core/auth/containers/register";
import {ROUTE_TO_LOGIN_PAGE, ROUTE_TO_MAIN_PAGE} from "../../routes";
import {Link} from "react-router-dom";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const page = ({register}) => {

    const [email, setEmail] = useState("");
    const [pass, setPass] = useState("");
    const [address, setAddress] = useState("");
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [organizationType, setOrganizationType] = useState("individual");
    const [agreeConf, setAgreeConf] = useState(false);

    const [illegalFields, setIllegalFields] = useState([]);

    const checkIt = (target) => {
        $(target).closest(".form-group").find(".uniform-checker span").removeClass("checked");

        if (target.checked)
            $(target).closest("span").addClass("checked");

        return setOrganizationType(target.value)
    }

    const validatePageFields = () => {
        const _illegalFields = [];

        // Empty check
        [
            {label: "address", value: address},
            {label: "name", value: name},
        ].forEach(field => {
            if (field.value === "")
                _illegalFields.push({label: field.label, msg: "Заполните, пожалуйста это поле"});
        });

        // Agree with confidential policy check
        if (!agreeConf)
            _illegalFields.push({
                label: "agreeConf",
                msg: "Пожалуйста, прочитайте условия конфиденциальности и дайте ваше согласие на обработку ваших данных"
            });

        // If password less than 8 symbols
        if (pass.length < 8)
            _illegalFields.push({
                label: "pass",
                msg: "Пароль должен быть не менее 8 символов, пожалуйста, придумайте другой пароль"
            });

        // Check phone number on fullness
        if (phone.replace(/\D/gm, "").length < 10)
            _illegalFields.push({
                label: "phone",
                msg: "Пожалуйста, проверьте формат вашего номера"
            });

        // Check email for correctness
        if (!email.match(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i))
            _illegalFields.push({
                label: "email",
                msg: "Кажется вы ввели неправильно ваш email, проверьте, пожалуйста"
            });

        setIllegalFields(_illegalFields);

        showErrors(_illegalFields)

        if (_illegalFields.length === 0)
            register({
                name,
                password: pass,
                email,
                phone,
                org_type_id: organizationType,
                address
            });
    }

    const showErrors = (errors) => {
        ["email", "pass", "phone", "name", "address", "organizationType", "agreeConf"]
            .forEach(id => $(`#${id}-error`).hide());

        // Show only illegal fields errors
        errors.forEach(error => {
            const element = $(`#${error.label}-error`);
            element.html(`<i class="icon-cancel-circle2 mr-2"/> ${error.msg}`);
            element.show();
        })
    }

    return (
        <>
            <div id="register">
                <div className="page-content">

                    <div className="content-wrapper">

                        <div className="content d-flex justify-content-center align-items-center">
                            <div className="register-form">
                                <div className="card mb-0">
                                    <div className="card-body">
                                        <div className="text-center mb-3">
                                            <i className="icon-user-plus icon-2x text-success border-success border-3 rounded-round p-3 mb-3 mt-1"/>
                                            <h5 className="mb-0">Создайте ваш аккаунт</h5>
                                            <span
                                                className="d-block text-muted">Все поля обязательны к заполнению</span>
                                        </div>

                                        <div className="form-group text-center text-muted content-divider">
                                            <span className="px-2">Ваши данные для входа</span>
                                        </div>

                                        <div className="form-group form-group-feedback form-group-feedback-left">
                                            <input type="text" value={email} onChange={e => setEmail(e.target.value)}
                                                   className="form-control" placeholder="Электронная почта"/>
                                            <div className="form-control-feedback">
                                                <i className="icon-mention text-muted"/>
                                            </div>
                                            <span className="form-text text-danger" id={"email-error"}/>
                                        </div>

                                        <div className="form-group form-group-feedback form-group-feedback-left">
                                            <input type="password" value={pass} onChange={e => setPass(e.target.value)}
                                                   className="form-control" placeholder="Пароль"/>
                                            <div className="form-control-feedback">
                                                <i className="icon-lock2 text-muted"/>
                                            </div>
                                            <span className="form-text text-danger" id={"pass-error"}/>
                                        </div>

                                        <div className="form-group text-center text-muted content-divider">
                                            <span className="px-2">Ваши контактные данные</span>
                                        </div>

                                        <div className="form-group form-group-feedback form-group-feedback-left">
                                            <input type="text" className="form-control" placeholder="Укажите ваш адрес"
                                                   value={address} onChange={e => setAddress(e.target.value)}/>
                                            <div className="form-control-feedback">
                                                <i className="icon-location4 text-muted"/>
                                            </div>
                                            <span className="form-text text-danger" id={"address-error"}/>
                                        </div>

                                        <div className="form-group form-group-feedback form-group-feedback-left">
                                            <input type="text" className="form-control"
                                                   placeholder="Как к вам обращаться ?"
                                                   value={name} onChange={e => setName(e.target.value)}/>
                                            <div className="form-control-feedback">
                                                <i className="icon-user text-muted"/>
                                            </div>
                                            <span className="form-text text-danger" id={"name-error"}/>
                                        </div>

                                        <div className="form-group form-group-feedback form-group-feedback-left">
                                            <InputMask mask="+7-(999)-999-99-99" maskChar={" "} type="text"
                                                       className="form-control" placeholder="Укажите номер телефона"
                                                       value={phone} onChange={e => setPhone(e.target.value)}/>
                                            <div className="form-control-feedback">
                                                <i className="icon-phone2 text-muted"/>
                                            </div>
                                            <span className="form-text text-danger" id={"phone-error"}/>
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
                                            <span className="form-text text-danger" id={"organizationType-error"}/>
                                        </div>

                                        <div className="form-group text-center text-muted content-divider">
                                            <span className="px-2">Условия</span>
                                        </div>

                                        <div className="form-group">
                                            <div className="form-check">
                                                <label className="form-check-label">
                                                    <div className="uniform-checker">
                                                    <span>
                                                        <input type="checkbox" name="agree"
                                                               className="form-input-styled"
                                                               value={agreeConf} onChange={e => {
                                                            if ($(e.target).prop("checked")) {
                                                                $(e.target).closest("span").addClass("checked");
                                                                setAgreeConf(true)
                                                            } else {
                                                                $(e.target).closest("span").removeClass("checked");
                                                                setAgreeConf(false)
                                                            }
                                                        }
                                                        }/>
                                                    </span>
                                                    </div>
                                                    Я согласен с <a href="#">политикой конфиденциальности</a> и даю свое
                                                    согласие на сбор и обработку моих данных
                                                </label>
                                            </div>
                                            <span className="form-text text-danger" id={"agreeConf-error"}/>
                                        </div>

                                        <button type="submit" className="btn bg-teal-400 btn-block"
                                                onClick={e => validatePageFields()}>
                                            Зарегистрироваться <i className="icon-circle-right2 ml-2"/>
                                        </button>
                                        <div className="text-center mt-2">
                                            <Link to={ROUTE_TO_LOGIN_PAGE}>Уже есть аккаунт ?</Link>
                                        </div>
                                        <div className="text-center mt-2">
                                            <Link to={ROUTE_TO_MAIN_PAGE}>Вернуться на главную</Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer/>
        </>
    );
}

export default RegisterContainer(page);
