import React, {useEffect, useState} from "react";
import SelectPicker from 'react-select'
import NumberFormat from 'react-number-format';
import {Product} from "../../models/product.model";

export const CartComponent = ({user, getProducts, productsInCart, productsList, setProductsInCart}) => {
    const [selectedProduct, setSelectedProduct] = useState(new Product);
    const [selectedAmount, setSelectedAmount] = useState(0);

    useEffect(() => {
        getProducts();
    }, []);

    return (
        <>
            <div className="cart mt-4">
                <div className="products_cart_title">
                    <h6>Корзина</h6>
                </div>
                <div className="products_cart">
                    {productsInCart.length !== 0
                        ? <>{productsInCart.map(
                            (product, key) =>
                                <div className="row" key={key}>
                                    <div className="col-md-3">
                                        <p className="pt-2">{product.name + " - " + product.volume + " л."}</p>
                                    </div>
                                    <div className="col-md-3">
                                        <p className="pt-2"><NumberFormat
                                            value={product.amount} className="product_in_cart_amount"
                                            onValueChange={e => setProductsInCart(productsInCart
                                                .map(p => ({
                                                    ...p, amount: p.id === product.id
                                                        ? e.value
                                                        : p.amount
                                                })))}
                                            thousandSeparator={" "}
                                            suffix={" шт."}
                                        />
                                            {user.isCustomer()
                                                ? <></>
                                                : <span className="text-muted">(всего на складе &nbsp;
                                                    {productsList.find(productFromList => productFromList.id === product.id).amount})
                                                        </span>
                                            }
                                        </p>
                                    </div>
                                    <div className="col-md-3">
                                        <p className="pt-2">
                                            {user.isCustomer()

                                                ?
                                                <span> {productsList.find(productFromList => productFromList.id === product.id).price}</span>
                                                : user.isWarehouser()
                                                    ? <></>
                                                    : <><NumberFormat
                                                        value={product.price} className="product_in_cart_price"
                                                        onValueChange={e => setProductsInCart(productsInCart
                                                            .map(p => ({
                                                                ...p,
                                                                price: p.id === product.id ? e.value : p.price
                                                            })))}
                                                        thousandSeparator={" "}
                                                        suffix={" тг"}

                                                    /><span className="text-muted"> (в розницу {
                                                        productsList.find(productFromList => productFromList.id === product.id).price
                                                    })</span></>
                                            }
                                        </p>
                                    </div>
                                    <div className="col-md-2">
                                        {user.isWarehouser()
                                            ? <></>
                                            : <p className="pt-2 text-right">{product.price * product.amount} тг</p>
                                        }

                                    </div>
                                    <div className="col-md-1 text-right">
                                        <button className="btn text-danger-400"
                                                onClick={e => {
                                                    setProductsInCart(productsInCart.filter(p => {
                                                        console.log(`p.id = ${p.id}, product.id = ${product.id}`);
                                                        return p.id !== product.id
                                                    }))
                                                }}>
                                            <i className="icon-cross2"/>
                                        </button>
                                    </div>
                                </div>)}

                            {user.isWarehouser()
                                ? <></>
                                : <div className="row">
                                    <div className="col-md-12">
                                        <hr/>
                                    </div>
                                    <div className="col-md-3"><p>Итого: </p></div>
                                    <div className="offset-md-6 col-md-2 text-right">
                                        <p>{productsInCart.reduce((accum, next) => accum + next.price * next.amount, 0)} тг</p>
                                    </div>
                                </div>
                            }

                        </>
                        : <p className="text-muted">Вы еще не добавили товары в корзину <br/>
                            Чтобы добавить товары в корзину, выберите товар, укажите количество и
                            нажмите на кнопку "добавить"</p>
                    }</div>
                <span className="form-text text-danger" id={"cart-error"}/>
            </div>
            <div className="new-product mt-4">
                <h6>Добавление товара в корзину</h6>
                <div className="row">
                    <div className="col-md-3 p-2">Выберите продукт:</div>
                    <div className="col-md-6">
                        <SelectPicker
                            id="product" placeholder="Выберите товар"
                            options={productsList
                                .filter(product => !productsInCart.some(productInCart => productInCart.id === product.id))
                                .map(product => ({
                                    label: user.isCustomer()
                                        ? product.name + " - " + product.volume + " л."
                                        : product.name + " - " + product.volume + " л., (на складе " + product.amount + ")",
                                    value: product.id,
                                    isDisabled: product.amount === 0
                                }))}
                            value={selectedProduct.id === 0 ? null : {
                                label: (selectedProduct.name + " - " + selectedProduct.volume + " л."),
                                value: selectedProduct.id
                            }}
                            onChange={e => {
                                setSelectedProduct(productsList.find(product => product.id === e.value))
                            }}
                            isClearable={true}/>
                    </div>
                    <div className="col-md-1 p-2">Кол-во:</div>
                    <div className="col-md-2">
                        <input type="number" className="form-control" id="amount"
                               placeholder="Кол-во" value={selectedAmount}
                               onChange={e => setSelectedAmount(e.target.value)}/>
                    </div>
                    <div className="col-md-12">
                        <span className="form-text text-danger" id={"product-error"}/>
                    </div>
                    <div className="col-md-3 offset-md-9 mt-2 text-right">
                        <button className="btn btn-outline-success"
                                onClick={e => {
                                    if (selectedProduct.id !== 0)
                                        setProductsInCart([
                                            ...productsInCart,
                                            {
                                                ...selectedProduct,
                                                amount: selectedAmount
                                            }
                                        ]);

                                    setSelectedProduct(new Product);
                                }}>
                            <i className="icon-plus3"/> &nbsp;&nbsp; Добавить в корзину
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}