import React from 'react';
import { Title } from '../shared';
import ProductList from './ProductList';
import ProductListHead from './ProductListHead';

export default function Products(props) {
    return (
        <div className="inner-wrapper">
            <Title text="Shopping cart" />
            <ProductListHead />
            <ProductList />
        </div>
    );
}
