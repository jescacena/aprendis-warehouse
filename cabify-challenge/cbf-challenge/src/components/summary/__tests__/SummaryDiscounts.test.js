import React from 'react';
import ReactDOM from 'react-dom';
import SummaryDiscounts from '../SummaryDiscounts';
it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<SummaryDiscounts />, div);
});