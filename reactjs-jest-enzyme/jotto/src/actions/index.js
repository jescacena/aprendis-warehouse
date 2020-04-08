import { getLetterMatchCount } from "../helpers";
import axios from "axios";

export const actionTypes = {
    CORRECT_GUESS: "CORRECT_GUESS",
    RESET_SUCCESS: "RESET_SUCCESS",
    RESET_GUESSED_WORDS: "RESET_GUESSED_WORDS",
    GUESS_WORD: "GUESS_WORD",
    SET_SECRET_WORD: "SET_SECRET_WORD",
    SET_SHOW_FAILURE_MESSAGE: "SET_SHOW_FAILURE_MESSAGE"
};

// export function correctGuess() {
//     return {
//         type: actionTypes.CORRECT_GUESS
//     };
// }

export const setShowFailureMessage = newValue => {
    return function(dispatch, getState) {
        dispatch({
            type: actionTypes.SET_SHOW_FAILURE_MESSAGE,
            payload: newValue
        });
        // dispatch({
        //     type: actionTypes.CORRECT_GUESS
        // });
    };
};

export const guessWord = guessedWord => {
    return function(dispatch, getState) {
        const secretWord = getState().secretWord;
        const letterMatchCount = getLetterMatchCount(guessedWord, secretWord);

        dispatch({
            type: actionTypes.GUESS_WORD,
            payload: { guessedWord, letterMatchCount }
        });

        if (guessedWord === secretWord) {
            dispatch({ type: actionTypes.CORRECT_GUESS });
        }
    };
};

export const getSecretWord = () => {
    return dispatch => {
        // axios.get("http://localhost:3030");
        return axios
            .get("https://random-word-api.herokuapp.com/word?number=1")
            .then(response => {
                dispatch({
                    type: actionTypes.SET_SECRET_WORD,
                    payload: response.data[0]
                });
                dispatch({
                    type: actionTypes.RESET_SUCCESS
                });
                dispatch({
                    type: actionTypes.RESET_GUESSED_WORDS
                });
            });
    };
};
