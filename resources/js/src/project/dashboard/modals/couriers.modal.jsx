import React, {useEffect, useState} from "react";
import InputMask from "react-input-mask";

export const CouriersModal = ({createCourier, getCouriers}) => {
    const [illegalFields, setIllegalFields] = useState([]);

    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");

    const [pageCreateCourierEvent, setPageCreateCourierEvent] = useState(0);

    useEffect(() => {
        getCouriers();
    }, []);

    const validatePageFields = () => {
        const _illegalFields = [];

        // Empty check
        [
            {label: "name", value: name},
            {label: "phone", value: phone},
        ].forEach(field => {
            if (field.value === "")
                _illegalFields.push({label: field.label, msg: "Заполните, пожалуйста это поле"});
        });

        setIllegalFields(_illegalFields);

        showErrors(_illegalFields)

        if(_illegalFields.length === 0){
            $("#create_courier_modal").modal('hide');
            createCourier({name, phone});
        }
    }

    const showErrors = (errors) => {
        ["name", "phone"]
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
            {/* Modal create product*/}
                <div className="modal fade" role="dialog" aria-hidden="true" id={"create_courier_modal"}>
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h4 className="modal-title" id="exampleModalLabel">Регистрация нового курьера</h4>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <div className="form-group">
                                    <div className="row">
                                        <div className="col-md-4">
                                            <p className="pt-2">Полное имя курьера</p>
                                        </div>
                                        <div className="col-md-8">
                                            <div className="form-group form-group-feedback form-group-feedback-left">
                                                <input value={name} className="form-control"
                                                       placeholder={"Введите полное имя курьера"}
                                                       onChange={e => setName(e.target.value)}/>
                                                <div className="form-control-feedback">
                                                    <i className="icon-user text-muted"/>
                                                </div>
                                                <span className="form-text text-danger" id={"name-error"}/>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-4">
                                        <p className="pt-2">Контактный телефон</p>
                                    </div>
                                    <div className="col-md-8">
                                        <div className="form-group form-group-feedback form-group-feedback-left">
                                            <InputMask mask="+7-(999)-999-99-99" maskChar={" "} type="text"
                                                       className="form-control" placeholder="Укажите номер телефона"
                                                       value={phone} onChange={e => setPhone(e.target.value)}/>
                                            <div className="form-control-feedback">
                                                <i className="icon-phone2 text-muted"/>
                                            </div>
                                            <span className="form-text text-danger" id={"phone-error"}/>
                                        </div>
                                    </div>
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
        </>
    )
}