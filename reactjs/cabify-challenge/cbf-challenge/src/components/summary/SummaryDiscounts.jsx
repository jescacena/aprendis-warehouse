import React from 'react';
import { useStateValue } from '../../common/services/state.service';
import HelperService from '../../common/services/helper.service';

export default function SummaryDiscounts(props) {
    const [{cartLines}] = useStateValue() || [{cartLines:[]}];

    const discounts = HelperService.discoverDiscountsApplied(cartLines)

    return (
        <div className="summary-discounts wrapper-half border">
            <h2>Discounts</h2>
            <ul>
                {discounts.map(item => (
                    <li key={item.code}>
                        <span>{item.label}</span>
                        <span>{item.value}€</span>
                    </li>
                ))}
            </ul>
        </div>
    );
}
