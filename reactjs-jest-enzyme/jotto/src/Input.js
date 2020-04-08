import React, { Component } from "react";
import { connect } from "react-redux";

import { guessWord } from "./actions";

export class UnconnectedInput extends Component {
    constructor(props) {
        super(props);

        this.state = {
            currentGuess: ""
        };

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();

        const guessedWord = this.state.currentGuess;

        if (guessedWord && guessedWord.length > 0) {
            this.props.guessWord(guessedWord);
            this.setState({ currentGuess: "" });
        }
    }

    render() {
        const contents =
            this.props.success || this.props.showFailureMessage ? null : (
                <form className="form-inline">
                    <input
                        data-test="input-box"
                        className="mb-2 mx-sm-3"
                        type="text"
                        value={this.state.currentGuess}
                        onChange={event => {
                            this.setState({
                                currentGuess: event.target.value
                            });
                        }}
                        placeholder="Enter guess"
                    />
                    <button
                        data-test="submit-button"
                        className="btn btn-primary mb-2"
                        type="submit"
                        onClick={this.handleSubmit}
                    >
                        Submit
                    </button>
                </form>
            );
        return <div data-test="component-input">{contents}</div>;
    }
}

const mapStateToProps = ({ success, showFailureMessage }) => {
    return { success, showFailureMessage };
};

export default connect(mapStateToProps, { guessWord })(UnconnectedInput);
