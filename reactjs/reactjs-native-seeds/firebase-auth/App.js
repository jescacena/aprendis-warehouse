import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import firebase from 'firebase';
import SignupForm from './components/SignupForm';
import SigninForm from './components/SigninForm';

export default class App extends React.Component {

  componentDidMount() {
    // Initialize Firebase
    const config = {
      apiKey: "AIzaSyCiAemzVzo76YBI5xsWEXaupANlyABKr2Q",
      authDomain: "one-time-password-ee626.firebaseapp.com",
      databaseURL: "https://one-time-password-ee626.firebaseio.com",
      projectId: "one-time-password-ee626",
      storageBucket: "one-time-password-ee626.appspot.com",
      messagingSenderId: "913006662195"
    };
    firebase.initializeApp(config);
  }

  render() {
    return (
      <View style={styles.container}>
        <SignupForm />
        <SigninForm />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
});
