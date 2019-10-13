import React, { Component } from "react";
import styles from './NavMenu.module';

import { connect } from 'react-redux'

import { setCurrentContentAction } from '../../actions'


export class NavMenu extends React.Component {

    goContent(key) {
        console.log('JES', key);
        this.props.setCurrentContent(key);
    }

    render() {
        console.log('NavMenu render');

        const { currentContent, data } = this.props;

        return (
            <div className={styles.container}>
                <ul>
                    <li onClick={() => this.goContent('ge')} className={currentContent === 'ge' ? styles.liSelected : ''}>
                        <a>Get and Edit data</a>
                    </li>
                    {data.specific && data.specific.length > 0 ?
                        <li onClick={() => this.goContent('ss')} className={currentContent === 'ss' ? styles.liSelected : ''}>
                            <a>Show and send data</a>
                        </li>
                        :
                        <li className={styles.liDisabled}>Show and send data</li>
                    }
                </ul>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    currentContent: state.currentContent,
    data: state.data
})

const mapDispatchToProps = dispatch => ({
    setCurrentContent: contentKey => dispatch(setCurrentContentAction(contentKey))
})
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(NavMenu)
