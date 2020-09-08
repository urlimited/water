import React, {useEffect, useState} from "react";
import CartComponent from "../../orders/containers/cart.container";

export const WarehouseModals = ({getProducts, getInventoryReports, getCouriers, productsForCourier, setProductsAtBeginning, selectedCourierId}) => {
    const [illegalFields, setIllegalFields] = useState([]);

    const [pageAddedForCourierEvent, setPageAddedForCourierEvent] = useState(0);

    useEffect(() => {
        getCouriers();
        getProducts();
    }, []);

    useEffect(() => {
        getCouriers();
    }, [pageAddedForCourierEvent]);

    const validatePageFields = () => {
        const _illegalFields = [];

        // If cart is empty
        if (productsForCourier.length === 0)
            _illegalFields.push({
                label: "cart",
                msg: "Ваша корзина пуста, добавьте товары в корзину"
            });

        setIllegalFields(_illegalFields);

        showErrors(_illegalFields)

        if(_illegalFields.length === 0){
            $("#warehouse_modal").modal('hide');
            setProductsAtBeginning({
                cart: JSON.stringify(productsForCourier),
                courier_id: selectedCourierId
            }).then(e => getInventoryReports());
            setPageAddedForCourierEvent(pageAddedForCourierEvent + 1);
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
                <div className="modal fade" role="dialog" aria-hidden="true" id={"warehouse_modal"}>
                    <div className="modal-dialog modal-lg">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h4 className="modal-title" id="exampleModalLabel">Товарная корзина на начало дня</h4>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <CartComponent />
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