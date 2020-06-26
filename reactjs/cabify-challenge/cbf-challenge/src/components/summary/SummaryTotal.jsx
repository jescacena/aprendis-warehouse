import React from 'react';
import { useStateValue } from '../../common/services/state.service';
import HelperService from '../../common/services/helper.service';
import CtaButton from '../shared/CtaButton';

export default function SummaryTotal(props) {
    const [{ cartLines }] = useStateValue() || [{ cartLines: [] }];
    const totalCheckout = HelperService.getTotalCheckout(cartLines);

    return (
        <div className="summary-total wrapper">
            <ul>
                <li>
                    <span className="summary-total-cost">Total cost</span>
                    <span className="summary-total-price">
                        {totalCheckout}€
                    </span>
                </li>
            </ul>
            <CtaButton
                label="Checkout"
                callbackFn={() => {
                    // TODO
                }}
            />
        </div>
    );
}
