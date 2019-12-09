import React from 'react';

import { Title } from '../shared';
import SummaryItems from './SummaryItems';
import SummaryDiscounts from './SummaryDiscounts';
import SummaryTotal from './SummaryTotal';

export default function Summary(props) {
    return (
        <div className="inner-wrapper">
            <Title text="Order Summary" />
            <SummaryItems />
            <SummaryDiscounts />
            <SummaryTotal />
        </div>
    );
}
