import React from "react";
// import PropTypes from "prop-types";

const NewWordButton = props => {
    const contents = props.success ? (
        <button data-test="new-word-button" onClick={props.onClickCallback}>
            Reset Game
        </button>
    ) : null;
    return <div>{contents}</div>;
};

// NewWordButton.propTypes = {
//     onClickCallback: PropTypes.func.isRequired,
//     success: PropTypes.bool.isRequired
// };

export default NewWordButton;
