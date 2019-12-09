import React from 'react';

import ShoppingCart from './ShoppingCart';
import ProductDetailModal from './ProductDetailModal';
import { useStateValue } from '../common/services/state.service';

export default function MainContainer(props) {
    const [{ productDetailModal }] = useStateValue() || [
        { productDetailModal: { show: false } },
        () => {}
    ];

    return (
        <div id="root">
            {productDetailModal && productDetailModal.show ? (
                <ProductDetailModal />
            ) : (
                <ShoppingCart />
            )}
        </div>
    );
}
