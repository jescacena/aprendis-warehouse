import React from 'react';

import { useStateValue } from '../../common/services/state.service';
import ProductListItem from './ProductListItem';

export default function ProductList(props) {
    const [{cartLines}] = useStateValue() || [{cartLines:[]}];

    return (
        <ul className="products-list">
            {cartLines.map(item => (
                <ProductListItem key={item.code} data={item} />
            ))}
        </ul>
    );
}
