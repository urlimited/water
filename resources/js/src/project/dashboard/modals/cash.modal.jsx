import React, {useEffect, useState} from "react";
import NumberFormat from "react-number-format";

export const CashModals = ({selectedCourierId, getCashReports, cashReport, setCashAtBeginning}) => {
    const [illegalFields, setIllegalFields] = useState([]);

    const [cashOnHand, setCashOnHand] = useState(0);
    const [pageAddedForCourierEvent, setPageAddedForCourierEvent] = useState(0);

    useEffect(() => {
    }, []);

    useEffect(() => {
        getCashReports()
    }, [pageAddedForCourierEvent]);

    const validatePageFields = () => {
        const _illegalFields = [];

        setIllegalFields(_illegalFields);

        showErrors(_illegalFields)

        if (_illegalFields.length === 0) {
            $("#cash_modal").modal('hide');
            setCashAtBeginning({courier_id: selectedCourierId, amount: cashOnHand})
                .then(e => setPageAddedForCourierEvent(pageAddedForCourierEvent + 1));
        }
    }

    const showErrors = (errors) => {
        ["cart"]
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
            <div className="modal fade" role="dialog" aria-hidden="true" id={"cash_modal"}>
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h4 className="modal-title" id="exampleModalLabel">Товарная корзина на начало дня</h4>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <div className="form-group">
                                <span>Укажите сумму на руках у курьера в начале дня</span>
                                <NumberFormat
                                    value={cashOnHand} className="cash_on_hand"
                                    onValueChange={e => setCashOnHand(e.value)}
                                    thousandSeparator={" "}
                                    suffix={" тг"}

                                />
                            </div>
                            <div className="cash_reports_orders">
                                <h5>Список всех заказов текущего курьера</h5>
                                {cashReport
                                    ? cashReport.ordersDuringDay.map((order, key) => (
                                        <div key={key} className="row">
                                            <div className="col-md-3">
                                                <p>Адрес: {order.order_address}</p>
                                            </div>
                                            <div className="col-md-9">
                                                <p className="text-right">{order.amount_ordered * order.price_ordered} тг.</p>
                                            </div>
                                        </div>
                                    ))
                                    : <></>
                                }
                                <hr/>
                                <p className="text-right">
                                    {cashReport ? cashReport.cashDuringDay : 0} тг.
                                </p>
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