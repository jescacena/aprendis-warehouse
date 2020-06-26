import React from 'react';
import ReactDOM from 'react-dom';
import * as enzyme from 'enzyme';
import sinon from 'sinon';
import Adapter from 'enzyme-adapter-react-16';

import ProductDetailModal from '../ProductDetailModal';

enzyme.configure({ adapter: new Adapter() });

let modal;

describe('ProductDetailModal', () => {
    beforeEach(() => {
        modal = enzyme.shallow(<ProductDetailModal />);
    });
    it('renders without crashing', () => {
        expect(modal).toBeTruthy();
    });
    
    it('renders SplitPane', () => {
        expect(modal.find('SplitPane')).toHaveLength(1)
    });
});
