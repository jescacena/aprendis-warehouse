import React, { Component } from "react";
import "./App.css";
import GuessedWords from "./GuessedWords";
import Congrats from "./Congrats";
import { connect } from "react-redux";
import Input from "./Input";

import { getSecretWord, setShowFailureMessage } from "./actions";
import NewWordButton from "./NewWordButton";
import FailureMessage from "./FailureMessage";
import GiveupButton from "./GiveupButton";

export class UnconnectedApp extends Component {
    constructor(props) {
        super(props);

        this.resetGame = this.resetGame.bind(this);
        this.handleGiveup = this.handleGiveup.bind(this);
    }
    componentDidMount() {
        this.props.getSecretWord();
    }

    resetGame() {
        this.props.getSecretWord();
        this.props.setShowFailureMessage(false);
    }

    handleGiveup() {
        this.props.setShowFailureMessage(true);
    }

    render() {
        return (
            <div className="container">
                <h1>Jotto App</h1>
                {/* <div>The secret word is {this.props.secretWord}</div> */}
                <NewWordButton
                    onClickCallback={this.resetGame}
                    success={
                        this.props.success || this.props.showFailureMessage
                    }
                />
                <Congrats success={this.props.success} />
                <FailureMessage
                    secretWord={this.props.secretWord}
                    show={this.props.showFailureMessage}
                />
                <Input />
                <GiveupButton
                    onClickCallback={() => {
                        this.handleGiveup();
                    }}
                />
                <GuessedWords guessedWords={this.props.guessedWords} />
            </div>
        );
    }
}

const mapStateToProps = ({
    success,
    guessedWords,
    secretWord,
    showFailureMessage
}) => {
    return { success, guessedWords, secretWord, showFailureMessage };
};

export default connect(mapStateToProps, {
    getSecretWord,
    setShowFailureMessage
})(UnconnectedApp);
