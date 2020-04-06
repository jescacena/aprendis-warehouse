/**
 * @method getLetterMatchCount
 * @param {string} guessedWord
 * @param {string} secretWord
 * @returns {number} - Number of letters matched between guessed word and secret word
 */
export const getLetterMatchCount = (guessedWord, secretWord) => {
    const guessedLetters = new Set(guessedWord, "");
    const secretLetters = new Set(secretWord, "");

    return [...secretLetters].filter(letter => guessedLetters.has(letter)).length;
};