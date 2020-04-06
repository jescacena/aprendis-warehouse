import React, { Component } from "react";
import "./App.css";
import GuessedWords from "./GuessedWords";
import Congrats from "./Congrats";
class App extends Component {
    render() {
        return (
            <div className="container">
                <h1>Jotto App</h1>
                <Congrats success={true} />
                <GuessedWords
                    guessedWords={[
                        { guessedWord: "train", letterMatchCount: 4 }
                    ]}
                />
            </div>
        );
    }
}

export default App;
