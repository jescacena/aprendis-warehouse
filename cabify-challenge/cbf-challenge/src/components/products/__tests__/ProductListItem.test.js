import React from 'react';
import ReactDOM from 'react-dom';
import ProductListItem from '../ProductListItem';

const singleProductMock = {
    code: 'CAP',
    name: 'Cabify Cap',
    price: 5.0,
    image: 'cap.png',
    discount: { id: 'N_FOR_1', numItems: 2 }
};

jest.mock('../../../common/services/state.service');

describe('render checks', () => {
    beforeEach(() => {
    });
    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<ProductListItem data={singleProductMock} />, div);
    });
});
