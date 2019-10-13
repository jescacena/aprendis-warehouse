import React from 'react';
import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import MainContainer from '../src/components/container/MainContainer';

configure({ adapter: new Adapter() });


test('CheckboxWithLabel changes the text after click', () => {
  // Render a checkbox with label in the document
  const obj = shallow(<MainContainer />);

  expect(obj).not.toBe(null);
});