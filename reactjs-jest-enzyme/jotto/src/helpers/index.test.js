import {getLetterMatchCount} from './index';

describe("getLetterMatchCount", () => {
    const secretWord = 'party';

    test("return correct count when there are no matching letters", () => {
        const matches = getLetterMatchCount('bones', secretWord);
        expect(matches).toBe(0);
    });

    test("returns the correct count where there are 3 matching letters", () => {
        const matches = getLetterMatchCount('train', secretWord);
        expect(matches).toBe(3);
    });

    test("returns correct count when there are duplicate letters in the guessed word", () => {
        const matches = getLetterMatchCount('parka', secretWord);
        expect(matches).toBe(3);
    });
});