import React from "react";
import PropTypes from "prop-types";
import languageContext from "./contexts/languageContext";
import successContext from "./contexts/successContext";
import guessedWordsContext from "./contexts/guessedWordsContext";
import stringsModule from "./helpers/strings";
import { getLetterMatchCount } from "./helpers";

const Input = ({ secretWord }) => {
    const [currentGuess, setCurrentGuess] = React.useState("");
    const language = React.useContext(languageContext);
    const [success, setSuccess] = successContext.useSuccess();
    const [
        guessedWords,
        setGuessedWords
    ] = guessedWordsContext.useGuessedWords();

    if (success) {
        return null;
    }

    return (
        <div data-test="component-input">
            <form className="form-inline">
                <input
                    data-test="input-box"
                    className="mb-2 mx-sm-3"
                    type="text"
                    placeholder={stringsModule.getStringByLanguage(
                        language,
                        "guessInputPlaceholder"
                    )}
                    onChange={event => {
                        setCurrentGuess(event.target.value);
                    }}
                />
                <button
                    data-test="submit-button"
                    className="btn btn-primary mb-2"
                    onClick={evt => {
                        evt.preventDefault();

                        // update guesswords
                        const letterMatchCount = getLetterMatchCount(
                            currentGuess,
                            secretWord
                        );
                        const newGuessedWords = [
                            ...guessedWords,
                            { guessedWord: currentGuess, letterMatchCount }
                        ];

                        setGuessedWords(newGuessedWords);

                        if (currentGuess === secretWord) {
                            setSuccess(true);
                        }

                        // Clear input box
                        setCurrentGuess("");

                        // TODO update guessedWords context

                        // TODO check against secretWord and optionally update success context
                    }}
                >
                    {stringsModule.getStringByLanguage(language, "submit")}
                </button>
            </form>
        </div>
    );
};

Input.propTypes = {
    secretWord: PropTypes.string.isRequired
};

export default Input;
