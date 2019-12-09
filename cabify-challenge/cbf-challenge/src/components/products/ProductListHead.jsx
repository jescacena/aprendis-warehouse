import React from 'react';

export default function ProductListHead(props) {
    return (
        <ul className="products-list tableHead">
            <li className="products-list-title row">
                <div className="col-product">Product details</div>
                <div className="col-quantity">Quantity</div>
                <div className="col-price">Price</div>
                <div className="col-total">Total</div>
            </li>
        </ul>
    );
}
