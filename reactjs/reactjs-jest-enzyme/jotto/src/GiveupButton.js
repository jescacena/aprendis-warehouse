import React, { Component } from "react";
import { connect } from "react-redux";

export class UnconnectedGiveupButton extends Component {
    render() {
        const showGiveup =
            !this.props.success &&
            this.props.guessedWords.length > 0 &&
            !this.props.showFailureMessage;
        const contents = showGiveup ? (
            <button
                data-test="giveup-button"
                onClick={this.props.onClickCallback}
            >
                Give up
            </button>
        ) : null;
        return <div data-test="giveup-wrapper">{contents}</div>;
    }
}

const mapStateToProps = ({ success, guessedWords, showFailureMessage }) => {
    return { success, guessedWords, showFailureMessage };
};

export default connect(mapStateToProps)(UnconnectedGiveupButton);
