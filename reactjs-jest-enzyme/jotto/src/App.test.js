import React from "react";
import ReactDOM from "react-dom";
import { render } from "@testing-library/react";
import App, { UnconnectedApp } from "./App";
import { shallow } from "enzyme";

import { findByTestAttr, storeFactory } from "../test/testUtils";
import NewWordButton from "./NewWordButton";
import GiveupButton from "./GiveupButton";

const setup = (initialState = {}) => {
    const store = storeFactory(initialState);
    const wrapper = shallow(<App store={store} />)
        .dive()
        .dive();
    // console.log(wrapper.debug());
    return wrapper;
};

describe("redux props", () => {
    test("has success piece of state as prop", () => {
        const success = true;
        const wrapper = setup({ success });
        const successProp = wrapper.instance().props.success;
        expect(successProp).toBe(success);
    });
    test("has secretWord piece of state as prop", () => {
        const secretWord = "triana";
        const wrapper = setup({ secretWord });
        const secretWordProp = wrapper.instance().props.secretWord;
        expect(secretWordProp).toBe(secretWord);
    });
    test("has guessedWords piece of state as prop", () => {
        const guessedWords = [{ guessedWord: "pepe", letterMatchCount: 0 }];
        const wrapper = setup({ guessedWords });
        const guessedWordsProp = wrapper.instance().props.guessedWords;
        expect(guessedWordsProp).toEqual(guessedWords);
    });

    test("getSecretWord action creator is a function prop", () => {
        const wrapper = setup();
        const getSecretWordProp = wrapper.instance().props.getSecretWord;

        expect(getSecretWordProp).toBeInstanceOf(Function);
    });
});

describe("getSecretWords action creator calls", () => {
    test("getSecretWords runs on App mount", () => {
        const getSecretWordMock = jest.fn();
        const props = {
            getSecretWord: getSecretWordMock,
            success: false,
            guessedWords: []
        };
        const wrapper = shallow(<UnconnectedApp {...props} />);

        wrapper.instance().componentDidMount();

        const callsCount = getSecretWordMock.mock.calls.length;

        expect(callsCount).toBe(1);
    });
});

describe("resetGame", () => {
    test("getSecretWord runs on new word button click", () => {
        const getSecretWordMock = jest.fn();
        const setShowFailureMessageMock = jest.fn();
        const props = {
            getSecretWord: getSecretWordMock,
            setShowFailureMessage: setShowFailureMessageMock,
            success: true,
            guessedWords: []
        };
        const wrapper = shallow(<UnconnectedApp {...props} />);

        const newWordButtonComponent = wrapper.find(NewWordButton).dive();
        // console.log("JES debug -->", newWordButtonComponent.debug());

        const button = findByTestAttr(
            newWordButtonComponent,
            "new-word-button"
        );

        button.simulate("click");

        const callsCount = getSecretWordMock.mock.calls.length;

        expect(callsCount).toBe(1);
    });
});
