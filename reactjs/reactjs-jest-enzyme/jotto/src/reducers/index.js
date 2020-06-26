import { combineReducers } from "redux";
import success from "./successReducer";
import guessedWords from "./guessedWordsReducer";
import secretWord from "./secretWordReducer";
import showFailureMessage from "./showFailureMessageReducer";

export default combineReducers({
    success,
    guessedWords,
    secretWord,
    showFailureMessage
});
