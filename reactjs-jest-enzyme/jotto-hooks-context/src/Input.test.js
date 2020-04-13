import React from "react";
import { shallow, mount } from "enzyme";

import { findByTestAttr, checkProps } from "../test/testUtils";
import Input from "./Input";
import languageContext from "./contexts/languageContext";
import successContext from "./contexts/successContext";
import guessedWordsContext from "./contexts/guessedWordsContext";

const setup = ({ secretWord, language, success }) => {
    language = language || "en";
    secretWord = secretWord || "";
    success = success || false;
    return mount(
        <languageContext.Provider value={language}>
            <successContext.SuccessProvider value={[success, jest.fn()]}>
                <guessedWordsContext.GuessedWordsProvider>
                    <Input secretWord={secretWord} />
                </guessedWordsContext.GuessedWordsProvider>
            </successContext.SuccessProvider>
        </languageContext.Provider>
    );
};

test("renders without error", () => {
    const wrapper = setup({ secretWord: "pepe" });
    const component = findByTestAttr(wrapper, "component-input");
    expect(component.length).toBe(1);
});

test("does not throw warning with expected props", () => {
    const expectedProps = { secretWord: "test" };
    checkProps(Input, expectedProps);
});

describe("languagePicker", () => {
    test("correctly renders submit string in english", () => {
        const wrapper = setup({});
        const button = findByTestAttr(wrapper, "submit-button");
        expect(button.text()).toBe("Submit");
    });
    test("correctly renders submit string in emoji", () => {
        const wrapper = setup({ language: "emoji" });
        const button = findByTestAttr(wrapper, "submit-button");
        expect(button.text()).toBe("🚀");
    });
});

describe("state controlled input field", () => {
    let mockSetCurrentGuess = jest.fn();
    let wrapper;
    beforeEach(() => {
        mockSetCurrentGuess.mockClear();
        React.useState = jest.fn(() => ["", mockSetCurrentGuess]);
        wrapper = setup({ secretWord: "pepe" });
    });
    test("state updates with value of input box upon change", () => {
        const inputBox = findByTestAttr(wrapper, "input-box");
        const mockEvent = { target: { value: "train" } };
        inputBox.simulate("change", mockEvent);
        expect(mockSetCurrentGuess).toHaveBeenCalledWith("train");
    });

    test("field is cleared upon submit button click", () => {
        const submitButton = findByTestAttr(wrapper, "submit-button");
        const mockEvent = {
            target: { value: "train" },
            preventDefault: () => {}
        };
        submitButton.simulate("click", mockEvent);
        expect(mockSetCurrentGuess).toHaveBeenCalledWith("");
    });
});

test("input component does not show when success is true", () => {
    const wrapper = setup({ secretWord: "party", success: true });
    expect(wrapper.isEmptyRender()).toBe(true);
});
