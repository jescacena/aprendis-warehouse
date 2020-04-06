import React from "react";
import GuessedWords from "./GuessedWords";

import { findByTestAttr, checkProps } from "../test/testUtils";

import { shallow } from "enzyme";

// Uncomment to force failing in checkProps
// const defaultProps = {
//     guessedWords: "kaka"
// };

const defaultProps = {
    guessedWords: [
        {
            guessedWord: "train",
            letterMatchCount: 3
        }
    ]
};

const setup = (props = {}) => {
    const setupProps = { ...defaultProps, ...props };

    return shallow(<GuessedWords {...setupProps} />);
};

test("does not throw a warning with expected props", () => {
    checkProps(GuessedWords, defaultProps);
});

describe("if there are no words guessed", () => {
    let wrapper;
    beforeEach(() => {
        wrapper = setup({ guessedWords: [] });
    });
    test("renders without error", () => {
        const component = findByTestAttr(wrapper, "component-guessed-words");
        expect(component.length).toBe(1);
    });
    test("renders instructions to guess a word", () => {
        const instructions = findByTestAttr(wrapper, "guess-instructions");
        expect(instructions.text().length).not.toBe(0);
    });
});

describe("if there are some words guessed", () => {
    let wrapper;
    const guessedWords = [
        { guessedWord: "train", letterMatchCount: 3 },
        { guessedWord: "agile", letterMatchCount: 1 },
        { guessedWord: "party", letterMatchCount: 5 }
    ];
    beforeEach(() => {
        wrapper = setup({ guessedWords });
    });
    test("renders without error", () => {
        const component = findByTestAttr(wrapper, "component-guessed-words");
        expect(component.length).toBe(1);
    });
    test("renders 'guessed words' section", () => {
        const guessedWordsDiv = findByTestAttr(wrapper, "guessed-words");
        expect(guessedWordsDiv.length).toBe(1);
    });
    test("correct number of guessed words", () => {
        const guessWordsNodes = findByTestAttr(wrapper, "guessed-word");
        expect(guessWordsNodes.length).toBe(guessedWords.length);
    });
});
