import React from 'react';
import ReactDOM from 'react-dom';
import ProductListHead from '../ProductListHead';
it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<ProductListHead />, div);
});