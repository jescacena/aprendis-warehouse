import React, { Component } from "react";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'

export class DeleteIcon extends React.Component {

    render() {

        return <span onClick={() => {this.props.deleteFn()}}><FontAwesomeIcon icon={faTrash} size="xs" /></span>;

    }
}
export default DeleteIcon;

