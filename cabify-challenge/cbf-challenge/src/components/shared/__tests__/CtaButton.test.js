import React from 'react';
import ReactDOM from 'react-dom';
import sinon from 'sinon';
import * as enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import CtaButton from '../CtaButton';

enzyme.configure({ adapter: new Adapter() });

let div;
let button;
let onClick;

describe('CtaButton', () => {
    beforeEach(() => {
        div = document.createElement('div');
        // ReactDOM.render(, div);
        onClick = jest.fn();
        
        button = enzyme.shallow(<CtaButton callbackFn={onClick} />);
    });
    it('renders without crashing', () => {
        expect(button).toBeTruthy();
    });

    it('click on callbackfn is called', () => {
        button.find('button').simulate('click');
        expect(onClick).toHaveBeenCalled();
    });
});
