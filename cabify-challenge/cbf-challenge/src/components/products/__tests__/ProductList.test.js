import React from 'react';
import ReactDOM from 'react-dom';
import ProductList from '../ProductList';

const productListMock = [
    {
        code: 'CAP1',
        name: 'Cabify Cap1',
        price: 5.0,
        image: 'cap.png',
        discount: { id: 'N_FOR_1', numItems: 2 }
    },
    {
        code: 'CAP2',
        name: 'Cabify Cap2',
        price: 5.0,
        image: 'cap.png',
        discount: { id: 'N_FOR_1', numItems: 2 }
    }
];

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<ProductList data={productListMock}/>, div);
});
