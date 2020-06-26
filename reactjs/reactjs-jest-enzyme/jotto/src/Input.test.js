import React from "react";
import { shallow } from "enzyme";

import { findByTestAttr, storeFactory } from "../test/testUtils";

import Input, { UnconnectedInput } from "./Input";

const setup = (initialState = {}) => {
    const store = storeFactory(initialState);
    const wrapper = shallow(<Input store={store} />)
        .dive()
        .dive();
    // console.log(wrapper.debug());
    return wrapper;
};
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

describe("redux props", () => {
    test("has success piece of state as prop", () => {
        const success = true;
        const wrapper = setup({ success });

        const successProp = wrapper.instance().props.success;

        expect(successProp).toBe(success);
    });

    test("guessWord action creator is a function prop", () => {
        const wrapper = setup();
        const guessWordProp = wrapper.instance().props.guessWord;

        expect(guessWordProp).toBeInstanceOf(Function);
    });
});

describe("guessWord runs on Input submit click", () => {
    let guessWordMock;
    let wrapper;
    const guessedWord = "train";

    beforeEach(() => {
        guessWordMock = jest.fn();
        const props = {
            guessWord: guessWordMock
        };
        wrapper = shallow(<UnconnectedInput {...props} />);

        // add value to input box
        wrapper.setState({ currentGuess: guessedWord });

        // simulate click on submit button
        const submitButton = findByTestAttr(wrapper, "submit-button");
        submitButton.simulate("click", { preventDefault() {} });
    });

    test("guessWord runs on Input submit click", () => {
        const callsCount = guessWordMock.mock.calls.length;
        expect(callsCount).toBe(1);
    });

    test("calls 'guessWord' with input value as argument", () => {
        // console.log("JES --->", guessWordMock.mock.calls);
        const guessedWordArg = guessWordMock.mock.calls[0][0];
        expect(guessedWordArg).toBe(guessedWord);
    });

    test("input box clears on submit", () => {
        expect(wrapper.state("currentGuess")).toBe("");
    });
});
