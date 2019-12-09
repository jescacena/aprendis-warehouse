import React from 'react';
import Products from './products/Products';
import Summary from './summary/Summary';
import { SplitPane } from './shared';

export default function ShoppingCart(props) {
    return (
        <SplitPane
            left={<Products />}
            right={<Summary />} 
        />
    );
}
