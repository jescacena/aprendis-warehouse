import React, { Component } from 'react';
import {
  View, Text, Button
} from 'react-native';
import firebase from 'firebase';

import { Header, Spinner } from './components/common';

import LoginForm from './components/LoginForm';

export default class App extends Component<{}> {

  state = { loggedIn: null };

  componentWillMount() {
    firebase.initializeApp(
      {
        apiKey: 'AIzaSyCtZLtsU_SGT5F5O4m20LS6ij52RkdptFI',
        authDomain: 'auth-24e67.firebaseapp.com',
        databaseURL: 'https://auth-24e67.firebaseio.com',
        projectId: 'auth-24e67',
        storageBucket: 'auth-24e67.appspot.com',
        messagingSenderId: '848165238937'
      }
    );

    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ loggedIn: true });
      } else {
        this.setState({ loggedIn: false });
      }
    });
  }

  renderContent() {
    const { spinnerStyle } = styles;
    switch (this.state.loggedIn) {
      case true:
        console.log('JES logout!!!!');
        return (
          <View>
            <Button onPress={() => firebase.auth().signOut()}> Log out </Button>
          </View>
        );
      case false:
        return <LoginForm />;
      default:
        return (
          <View style={spinnerStyle}>
            <Spinner size="large" />
          </View>
        );
    }
  }

  render() {
    return (
      <View>
        <Header headerText="Authentication" />
        {this.renderContent()}
      </View>
    );
  }
}

const styles = {
  spinnerStyle: {
    // flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
};

