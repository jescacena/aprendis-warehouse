import React, { Component } from "react";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'

export class Spinner extends React.Component {

    render() {

        return <FontAwesomeIcon icon={faSpinner} spin size="4x" />;

    }
}
export default Spinner;

