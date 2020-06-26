import React from 'react';
import { useStateValue } from '../common/services/state.service';
import closeIcon from '../assets/svg/close.svg'; // Tell Webpack this JS file uses this image
import { SplitPane } from './shared';

export default function ProductDetailModal(props) {
    const [{ productDetailModal }, dispatch] = useStateValue() || [
        { productDetailModal: { show: false } },
        () => {}
    ];

    const divWithBI = (
        <div
            style={{
                background: `url("${productDetailModal.image}") no-repeat center`,
                backgroundImage: 'cover'
            }}
        ></div>
    );

    const onClose = e => {
        dispatch({
            type: 'closeProductDetailModal'
        });
    };

    return (
        <SplitPane
            customClass='full-modal'
            left={divWithBI}
            right={
                <div>
                    <img
                        className="close"
                        src={closeIcon}
                        alt="Shirt"
                        onClick={onClose}
                    />

                    <ul className="summary-items wrapper border">
                        <li>
                            <span className="summary-items-number">Shirt</span>
                            <span className="summary-items-price">
                                20<span className="currency">€</span>
                            </span>
                        </li>
                    </ul>
                    <ul className="summary-items wrapper border">
                        <li>
                            <p>
                                Lorem Ipsum is simply dummy text of the printing
                                and typesetting industry. Lorem Ipsum has been
                                the industry's standard dummy text ever since
                                the 1500s, when an unknown printer took a galley
                                of type and scrambled it to make a type specimen
                                book. It has survived not only five centuries,
                                but also the leap into electronic typesetting,
                                remaining essentially unchanged.
                            </p>
                        </li>
                    </ul>
                    <button className="cta-add" type="submit">Add to cart</button>
                </div>
            }
        />
    );
}
