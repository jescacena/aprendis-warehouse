import React from "react";
import { shallow } from "enzyme";
import { findByTestAttr, storeFactory } from "../test/testUtils";
import GiveupButton, { UnconnectedGiveupButton } from "./GiveupButton";

const setup = (initialState = {}) => {
    const store = storeFactory(initialState);
    const wrapper = shallow(<GiveupButton store={store} />)
        .dive()
        .dive();
    // console.log(wrapper.debug());
    return wrapper;
};

describe("renders", () => {
    test("renders without crash", () => {
        const wrapper = setup();
        const wrapperNode = findByTestAttr(wrapper, "giveup-wrapper");
        expect(wrapperNode.length).toBe(1);
    });
    test("renders button when word has not been guessed correctly and some try done", () => {
        const wrapper = setup({
            success: false,
            guessedWords: [{ guessedWord: "pepe", letterMatchCount: 0 }]
        });
        const buttonNode = findByTestAttr(wrapper, "giveup-button");
        expect(buttonNode.length).toBe(1);
    });
    test("does not render button when no guessed words entered", () => {
        const wrapper = setup({ guessedWords: [] });
        const buttonNode = findByTestAttr(wrapper, "giveup-button");
        expect(buttonNode.length).toBe(0);
    });
    test("does not render button when word has been guessed correctly", () => {
        const wrapper = setup({ success: true });
        const buttonNode = findByTestAttr(wrapper, "giveup-button");
        expect(buttonNode.length).toBe(0);
    });
});

describe("redux props", () => {
    test("has success piece of state as prop", () => {
        const success = true;
        const wrapper = setup({ success });
        const successProp = wrapper.instance().props.success;
        expect(successProp).toBe(success);
    });
    test("has guessedWords piece of state as prop", () => {
        const guessedWords = [{ guessedWord: "pepe", letterMatchCount: 0 }];
        const wrapper = setup({ guessedWords });
        const guessedWordsProp = wrapper.instance().props.guessedWords;
        expect(guessedWordsProp).toBe(guessedWords);
    });
});
