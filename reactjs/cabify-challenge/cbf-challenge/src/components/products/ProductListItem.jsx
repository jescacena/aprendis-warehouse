import React, { useState, useEffect } from 'react';
import { useStateValue } from '../../common/services/state.service';

export default function ProductListItem(props) {
    const { data } = props;
    const imageRef = require('../../assets/img/' + data.image);
    const [{cartLines}, dispatch] = useStateValue() || [{cartLines:[]}, () => {}];
    
    const [count, setCount] = useState(0);
    useEffect(() => {
        const indexToUpdate = cartLines.findIndex(item => item.code === data.code)
        dispatch({
            type: 'updateCartLine',
            indexToUpdate,
            newCartLine: {...data, quantity: count, total:count*data.price}
        });
    }, [count]);

    return (
        <li className="product row">
            <div className="col-product">
                <figure className="product-image">
                    <img
                        src={imageRef}
                        alt={data.name}
                        onClick={e => {
                            dispatch({
                                type: 'openProductDetailModal',
                                image: data.imageDetail
                            });
                        }}
                    />
                    <div className="product-description">
                        <h1>{data.name}</h1>
                        <p className="product-code">Product code {data.code}</p>
                    </div>
                </figure>
            </div>
            <div className="col-quantity">
                <button
                    className="count"
                    onClick={e => {
                        if(count-1 < 0){
                            setCount(0)
                        } else {
                            setCount(count-1)
                        }
                    }}>-</button>
                <input
                    type="text"
                    disabled
                    className="product-quantity"
                    value={count}
                />
                <button
                    className="count"
                    onClick={e => {
                        setCount(count+1)
                    }}>+</button>
            </div>
            <div className="col-price">
                <span className="product-price">{data.price}</span>
                <span className="product-currency currency">€</span>
            </div>
            <div className="col-total">
                <span className="product-price">{data.total}</span>
                <span className="product-currency currency">€</span>
            </div>
        </li>
    );
}
