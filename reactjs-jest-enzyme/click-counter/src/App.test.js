import React from "react";
import Enzyme, { shallow, ShallowWrapper } from "enzyme";
import EnzymeAdapter from "enzyme-adapter-react-16";
import { render } from "@testing-library/react";
import App from "./App";

Enzyme.configure({ adapter: new EnzymeAdapter() });

/**
 * Factory function to create a ShallowWrapper for the App Component
 * @function setup
 * @param {object} props - Component props specific to this setup
 * @param {any} state - Initial state for setup
 * @returns {ShallowWrapper}
 */
const setup = (props = {}, state = null) => {
    const wrapper = shallow(<App {...props} />);
    if (state) wrapper.setState(state);
    return wrapper;
};

/**
 * Return ShallowWrapper containing node(s) with the given data-test value
 * @param {ShallowWrapper} wrapper - Enzyme shallow wrapper to search within
 * @param {string} val - Value of data-test attribute for search
 * @returns {ShallowWrapper}
 */
const findByTestAttr = (wrapper, val) => {
    return wrapper.find(`[data-test="${val}"]`);
};

test("renders without error", () => {
    const wrapper = setup();
    const appComponent = findByTestAttr(wrapper, "component-app");
    expect(appComponent.length).toBe(1);
});

test("renders increment button", () => {
    const wrapper = setup();
    const button = findByTestAttr(wrapper, "component-button");
    expect(button.length).toBe(1);
});

test("renders a decrement button", () => {
    const wrapper = setup();
    const button = findByTestAttr(wrapper, "decrement-button");
    expect(button.length).toBe(1);
});

test("render counter display", () => {
    const wrapper = setup();
    const counter = findByTestAttr(wrapper, "component-counter");
    expect(counter.length).toBe(1);
});

test("counter starts at 0", () => {
    const wrapper = setup();
    const initialCounterState = wrapper.state("counter");
    expect(initialCounterState).toBe(0);
});

test("clicking button increments counter display", () => {
    const counter = 3;
    const wrapper = setup(null, { counter });

    const button = findByTestAttr(wrapper, "component-button");
    button.simulate("click");

    const counterDisplay = findByTestAttr(wrapper, "component-counter");
    expect(counterDisplay.text()).toContain(counter + 1);
});

test("clicking decrement button decrements counter display", () => {
    const counter = 5;
    const wrapper = setup(null, { counter });

    const button = findByTestAttr(wrapper, "decrement-button");
    button.simulate("click");

    const counterDisplay = findByTestAttr(wrapper, "component-counter");
    expect(counterDisplay.text()).toContain(counter - 1);
});

describe("counter is zero and decrement is clicked", () => {
    let wrapper;
    beforeEach(() => {
        wrapper = setup(); // Initial counter is zero

        const button = findByTestAttr(wrapper, "decrement-button");
        button.simulate("click");

        wrapper.update();
    });

    test("clicking decrement button doesnt decrement as counter cannot go below zero", () => {
        const counterDisplay = findByTestAttr(wrapper, "component-counter");
        expect(counterDisplay.text()).toContain(0);
    });

    test("shows error message on trying to decrement counter below from zero", () => {
        const errorMessage = findByTestAttr(wrapper, "error-message");
        expect(errorMessage.length).toBe(1);
    });
    test("Remove error when increment button is clicked", () => {
        const button = findByTestAttr(wrapper, "component-button");
        button.simulate("click");

        const errorMessage = findByTestAttr(wrapper, "error-message");
        expect(errorMessage.length).toBe(0);
    });
});
