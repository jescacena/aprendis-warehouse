import React from "react";
import { shallow } from "enzyme";

import { findByTestAttr, storeFactory } from "../test/testUtils";

import Input from "./Input";

const setup = (initialState = {}) => {
    const store = storeFactory(initialState);
    const wrapper = shallow(<Input store={store} />)
        .dive()
        .dive();
    // console.log(wrapper.debug());
    return wrapper;
};
// setup();
describe("render", () => {
    let wrapper;
    beforeEach(() => {
        const initialState = { success: false };
        wrapper = setup(initialState);
    });
    describe("word has not been guessed", () => {
        test("renders the component without error", () => {
            const component = findByTestAttr(wrapper, "component-input");
            expect(component.length).toBe(1);
        });
        test("renders input box", () => {
            const component = findByTestAttr(wrapper, "input-box");
            expect(component.length).toBe(1);
        });
        test("renders submit button", () => {
            const component = findByTestAttr(wrapper, "submit-button");
            expect(component.length).toBe(1);
        });
    });
    describe("word has been guessed", () => {
        let wrapper;
        beforeEach(() => {
            const initialState = { success: true };
            wrapper = setup(initialState);
        });
        test("renders the component without error", () => {
            const component = findByTestAttr(wrapper, "component-input");
            expect(component.length).toBe(1);
        });
        test("does not render input box", () => {
            const component = findByTestAttr(wrapper, "input-box");
            expect(component.length).toBe(0);
        });
        test("does not render submit button", () => {
            const component = findByTestAttr(wrapper, "submit-button");
            expect(component.length).toBe(0);
        });
    });
});

describe("update state", () => {});
