import React from "react";
import "./App.css";
import hookActions from "./actions/hookActions";

import Input from "./Input";

import languageContext from "./contexts/languageContext";
import successContext from "./contexts/successContext";
import guessedWordsContext from "./contexts/guessedWordsContext";

import LanguagePicker from "./LanguagePicker";
import CongratsInContext from "./CongratsInContext";
import GuessedWords from "./GuessedWords";
import GuessedWordsInContext from "./GuessedWordsInContext";

/**
 * reducer to update state, called automatically by dispatch
 * @param {object} state - existing state
 * @param {object} action - contains 'type' and 'payload' properties for the state update for example: {type:'setSecretWord', payload: "party"}
 * @returns {object} - new state
 */
function reducer(state, action) {
    switch (action.type) {
        case "setSecretWord":
            return { ...state, secretWord: action.payload };
        case "setLanguage":
            return { ...state, language: action.payload };
        default:
            throw new Error(`Invalid action type ${action.type}`);
    }
}

function App() {
    const [state, dispatch] = React.useReducer(reducer, {
        secretWord: null,
        language: "en"
    });

    const setSecretWord = secretWord => {
        dispatch({ type: "setSecretWord", payload: secretWord });
    };
    // Only called once un App mount
    React.useEffect(() => {
        hookActions.getSecretWord(setSecretWord);
    }, []);

    const setLanguage = language => {
        dispatch({ type: "setLanguage", payload: language });
    };

    if (!state.secretWord) {
        return (
            <div className="container" data-test="spinner">
                <div className="spinner-border" role="status">
                    <span className="sr-only">Loading...</span>
                </div>
                <p>Loading secret word...</p>
            </div>
        );
    }

    return (
        <div className="container" data-test="component-app">
            <h1>Jotto Jander</h1>
            <p>The secret word is {state.secretWord}</p>
            <languageContext.Provider value={state.language}>
                <LanguagePicker setLanguage={setLanguage} />
                <guessedWordsContext.GuessedWordsProvider>
                    <successContext.SuccessProvider>
                        <CongratsInContext />
                        <Input secretWord={state.secretWord} />
                    </successContext.SuccessProvider>
                    <GuessedWordsInContext />
                </guessedWordsContext.GuessedWordsProvider>
            </languageContext.Provider>
        </div>
    );
}

export default App;
