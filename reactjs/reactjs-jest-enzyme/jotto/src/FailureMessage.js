import React from "react";

const FailureMessage = props => {
    const contents = props.show ? (
        <p data-test="message">
            The secret word was {props.secretWord} <br />
            Better luck next time!
        </p>
    ) : null;
    return <div data-test="failure-message-wrapper">{contents}</div>;
};

export default FailureMessage;
