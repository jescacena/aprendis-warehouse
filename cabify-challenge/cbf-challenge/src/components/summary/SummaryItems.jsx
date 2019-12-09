import React from 'react';
import HelperService from "../../common/services/helper.service";
import { useStateValue } from '../../common/services/state.service';


export default function SummaryItems(props) {
    const [{cartLines}] = useStateValue() || [{cartLines:[]}];

    const totalItems = HelperService.getTotalItems(cartLines)
    const totalPrice = HelperService.getTotalPrice(cartLines)

    return (
        <ul className="summary-items wrapper border">
            <li>
                <span className="summary-items-number">{totalItems} Items</span>
                <span className="summary-items-price">
                    {totalPrice}<span className="currency">€</span>
                </span>
            </li>
        </ul>
    );
}
