import React, { Component } from "react";
import styles from './ContentContainer.module';
import GetEditContainer from "./GetEditContainer";
import ShowSendContainer from "./ShowSendContainer";
import { connect } from 'react-redux'


export class ContentContainer extends React.Component {

    render() {

        console.log('ContentContainer render');


        const {currentContent} = this.props;
        return (
            <div className={styles.container}>
                {currentContent === 'ge' ?
                    <GetEditContainer />
                    :
                    <ShowSendContainer />}
            </div>
        );
    }
}

const mapStateToProps = state => ({
    currentContent: state.currentContent
})

// const mapDispatchToProps = dispatch => ({
//     setCurrentContent: contentKey => dispatch(setCurrentContent(contentKey))
// })
export default connect(
    mapStateToProps
)(ContentContainer)