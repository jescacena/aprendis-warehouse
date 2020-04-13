import React from "react";
import { shallow, mount } from "enzyme";

import { findByTestAttr } from "../test/testUtils";
import successContext from "./contexts/successContext";
import guessedWordsContext from "./contexts/guessedWordsContext";
import Input from "./Input";
import GuessedWordsInContext from "./GuessedWordsInContext";

const setup = (
    guessedWordsStrings = [],
    secretWord = "party",
    success = false
) => {
    // language = language || "en";
    // secretWord = secretWord || "";
    // success = success || false;
    const wrapper = mount(
        <guessedWordsContext.GuessedWordsProvider>
            <successContext.SuccessProvider>
                <Input secretWord={secretWord} />
                <GuessedWordsInContext />
            </successContext.SuccessProvider>
        </guessedWordsContext.GuessedWordsProvider>
    );

    const inputBox = findByTestAttr(wrapper, "input-box");
    const submitButton = findByTestAttr(wrapper, "submit-button");

    // Prepopulating guessedWords context by simulating word guess
    guessedWordsStrings.map(word => {
        const mockEvent = { target: { value: word } };
        inputBox.simulate("change", mockEvent);
        submitButton.simulate("click");
    });

    return [wrapper, inputBox, submitButton];
};

describe("test word guesses", () => {
    let wrapper;
    let inputBox;
    let submitButton;

    describe("empty guessedWords", () => {
        beforeEach(() => {
            [wrapper, inputBox, submitButton] = setup([], "party", false);
        });

        test("GuessedWords table row count reflects updated guess", () => {
            const mockEvent = { target: { value: "train" } };
            inputBox.simulate("change", mockEvent);
            submitButton.simulate("click");

            // console.log(wrapper.debug());
            const rows = findByTestAttr(wrapper, "guessed-word");
            expect(rows.length).toBe(1);
        });
    });
    describe("non empty guessedWords", () => {
        beforeEach(() => {
            [wrapper, inputBox, submitButton] = setup(
                ["agile"],
                "party",
                false
            );
        });

        describe("correct guess", () => {
            beforeEach(() => {
                const mockEvent = { target: { value: "party" } };
                inputBox.simulate("change", mockEvent);
                submitButton.simulate("click");
            });

            test("Input component contains no children", () => {
                const inputComponent = findByTestAttr(
                    wrapper,
                    "component-input"
                );
                expect(inputComponent.children().length).toBe(0);
            });

            test("GuessedWords table row count reflects updated guess", () => {
                const rows = findByTestAttr(wrapper, "guessed-word");
                expect(rows.length).toBe(2);
            });
        });

        describe("incorrect guess", () => {
            beforeEach(() => {
                const mockEvent = { target: { value: "train" } };
                inputBox.simulate("change", mockEvent);
                submitButton.simulate("click");
            });
            test("Input box remains", () => {
                expect(inputBox.exists()).toBe(true);
            });
            test("GuessedWords table row count reflects updated guess", () => {
                const rows = findByTestAttr(wrapper, "guessed-word");
                expect(rows.length).toBe(2);
            });
        });
    });
});
