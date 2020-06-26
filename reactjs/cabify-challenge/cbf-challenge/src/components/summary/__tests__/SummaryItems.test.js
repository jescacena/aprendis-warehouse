import React from 'react';
import ReactDOM from 'react-dom';
import SummaryItems from '../SummaryItems';
it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<SummaryItems />, div);
});