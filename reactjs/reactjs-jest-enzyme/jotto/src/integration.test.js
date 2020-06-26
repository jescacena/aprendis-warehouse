import { storeFactory } from "../test/testUtils";
import { guessWord, setShowFailureMessage } from "./actions";

describe("showFailureMessage action creator", () => {
    test("set showFailureMessage to correct value", () => {
        const showFailureMessageValue = true;
        const store = storeFactory();

        store.dispatch(setShowFailureMessage(showFailureMessageValue));
        const newState = store.getState();
        expect(newState.showFailureMessage).toEqual(showFailureMessageValue);
    });
});

describe("guessWord action dispatcher", () => {
    const secretWord = "party";
    const unsuccessfulGuess = "train";
    describe("no guessed words", () => {
        let store;
        const initialState = { secretWord };
        beforeEach(() => {
            store = storeFactory(initialState);
        });
        test("updates state correctly for unsuccessful guess", () => {
            store.dispatch(guessWord(unsuccessfulGuess));
            const newState = store.getState();

            const expectedState = {
                ...initialState,
                success: false,
                showFailureMessage: false,
                guessedWords: [
                    {
                        guessedWord: unsuccessfulGuess,
                        letterMatchCount: 3
                    }
                ]
            };
            expect(newState).toEqual(expectedState);
        });
        test("updates state correctly for successful guess", () => {
            store.dispatch(guessWord(secretWord));
            const newState = store.getState();

            const expectedState = {
                ...initialState,
                success: true,
                showFailureMessage: false,
                guessedWords: [
                    {
                        guessedWord: secretWord,
                        letterMatchCount: 5
                    }
                ]
            };

            expect(newState).toEqual(expectedState);
        });
    });
    describe("some guessed words", () => {
        const guessedWords = [{ guessedWord: "agile", letterMatchCount: 1 }];
        const initialState = { guessedWords, secretWord };
        let store;
        beforeEach(() => {
            store = storeFactory(initialState);
        });
        test("updates state correctly for unsuccessful guess", () => {
            store.dispatch(guessWord(unsuccessfulGuess));
            const newState = store.getState();
            const expectedState = {
                secretWord,
                success: false,
                showFailureMessage: false,
                guessedWords: [
                    ...guessedWords,
                    { guessedWord: unsuccessfulGuess, letterMatchCount: 3 }
                ]
            };
            expect(newState).toEqual(expectedState);
        });
        test("updates state correctly for successful guess", () => {
            store.dispatch(guessWord(secretWord));
            const newState = store.getState();
            const expectedState = {
                secretWord,
                success: true,
                showFailureMessage: false,
                guessedWords: [
                    ...guessedWords,
                    { guessedWord: secretWord, letterMatchCount: 5 }
                ]
            };
            expect(newState).toEqual(expectedState);
        });
    });
});
