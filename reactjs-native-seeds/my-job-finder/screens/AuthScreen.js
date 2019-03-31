import React, { Component } from 'react';
import { View, Text, AsyncStorage } from 'react-native';
import { connect } from 'react-redux';
import * as actions from '../actions';

class AuthScreen extends Component {
    componentDidMount() {
        this.props.facebookLogin();

        //This is temporary code for test FB Auth flow
        AsyncStorage.removeItem('fb_token');
    }
    componentWillReceiveProps(nextProps) {
        this.onAuthComplete(nextProps);
    }
    onAuthComplete(props) {
        if (props.token) {
            this.props.navigation.navigate('map');
        }
    }
    render() {
        return (
            <View />
        );
    }
}

function mapStateToProps(state) {
    // console.log('JES jander-->', state);
    // debugger;
    return { token: state.auth.token };
}

export default connect(mapStateToProps, actions)(AuthScreen);
