import React, { Component } from "react";
import styles from './Footer.module';

import { connect } from 'react-redux'

import { swapCurrentContentAction, setCurrentContentAction } from '../../actions'



export class Footer extends React.Component {

    goContent(key) {
        console.log('JES', key);
        this.props.setCurrentContent(key);

    }

    swapContent() {
        this.props.swapCurrentContent();

    }

    render() {
        const {currentContent} = this.props;
        return (
            <div className={styles.container}>
                <ul>
                    <li><input onChange={() => { this.goContent('ge')}}  type="radio" name="nav-control" value="ge" checked={currentContent === 'ge'}></input></li>
                    <li><input onChange={() => { this.goContent('ss')}} type="radio" name="nav-control" value="ss" checked={currentContent === 'ss'}></input></li>
                </ul>
                <a onClick={() => { this.swapContent()}}>NEXT</a>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    currentContent: state.currentContent
})

const mapDispatchToProps = dispatch => ({
    swapCurrentContent: contentKey => dispatch(swapCurrentContentAction(contentKey)),
    setCurrentContent: contentKey => dispatch(setCurrentContentAction(contentKey))
})
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Footer)
