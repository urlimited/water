import React, {useState, useEffect} from "react";
import AuthContainer from "../../../core/auth/containers/login";
import * as errors from "../constants/errorsList";
import {ROUTE_TO_MAIN_PAGE, ROUTE_TO_REGISTER_PAGE} from "../../routes";
import {Link} from "react-router-dom";

const page = ({apiAuthAttempt, pageErrors, clearPageErrors}) => {
    const [email, setEmail] = useState("")
    const [pass, setPass] = useState("")

    const [illegalFields, setIllegalFields] = useState([]);

    const validatePageFields = () => {
        const _illegalFields = [];

        // Empty check
        [
            {label: "email", value: email},
            {label: "pass", value: pass},
        ].forEach(field => {
            if (field.value === "")
                _illegalFields.push({label: field.label, msg: "Заполните, пожалуйста это поле"});
        });

        setIllegalFields(_illegalFields);

        showErrors(_illegalFields)

        if (_illegalFields.length === 0)
            apiAuthAttempt(email, pass);
    }

    const showErrors = (errors) => {
        clearPageErrors();

        ["email", "pass"]
            .forEach(id => $(`#${id}-error`).hide());

        // Show only illegal fields errors
        errors.forEach(error => {
            const element = $(`#${error.label}-error`);
            element.html(`<i class="icon-cancel-circle2 mr-2"/> ${error.msg}`);
            element.show();
        })
    }

    useEffect(() => {
        console.log(pageErrors);
    }, [pageErrors]);

    return (
        <div className="page-content">
            <div className="content-wrapper">
                <div className="content d-flex justify-content-center align-items-center">
                    <div className="login-form">
                        <div className="card mb-0">
                            <div className="card-body">
                                <div className="text-center mb-3">
                                    <i className="icon-user-lock icon-2x text-slate-300 border-slate-300 border-3 rounded-round p-3 mb-3 mt-1"/>
                                    <h5 className="mb-0">Войдите в систему</h5>
                                    <span className="d-block text-muted">Введите ваши данные для входа</span>
                                </div>

                                <div className="form-group form-group-feedback form-group-feedback-left">
                                    <input type="text" className="form-control" placeholder="Электронная почта"
                                           value={email} onChange={e => setEmail(e.target.value)}/>
                                    <div className="form-control-feedback">
                                        <i className="icon-mention text-muted"/>
                                    </div>
                                    <span className="form-text text-danger" id={"email-error"}/>
                                </div>

                                <div className="form-group form-group-feedback form-group-feedback-left">
                                    <input type="password" className="form-control" placeholder="Пароль"
                                           value={pass} onChange={e => setPass(e.target.value)}/>
                                    <div className="form-control-feedback">
                                        <i className="icon-lock2 text-muted"/>
                                    </div>
                                    <span className="form-text text-danger" id={"pass-error"}/>
                                </div>

                                <div className="form-group">
                                    <button type="submit" className="btn btn-primary btn-block" tabIndex={1}
                                            onClick={e => validatePageFields()}>Войти <i
                                        className="icon-circle-right2 ml-2"/></button>
                                    <span className="form-text text-danger" id={"auth-error"}>
                                        {pageErrors.find(pageError => pageError.name === errors.ERROR_AUTH_FAILED)
                                            ? "Вы ввели неверные пароль и/или логин, попробуйте снова"
                                            : ""}
                                    </span>
                                </div>

                                <div className="text-center mt-2">
                                    <Link to={ROUTE_TO_REGISTER_PAGE}>Зарегистрироваться</Link>
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
    );
}


export default AuthContainer(page);