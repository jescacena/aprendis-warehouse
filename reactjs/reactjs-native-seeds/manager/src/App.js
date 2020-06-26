import React, { Component } from 'react';
import ReduxThunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import firebase from 'firebase';
import reducers from './reducers';
import Router from './Router';

class App extends Component {
  componentWillMount() {
    const config = {
      apiKey: 'AIzaSyA_CLWv4kcOi2rnG572Fg1zKCle3IAEFE0',
      authDomain: 'manager-a586c.firebaseapp.com',
      databaseURL: 'https://manager-a586c.firebaseio.com',
      projectId: 'manager-a586c',
      storageBucket: 'manager-a586c.appspot.com',
      messagingSenderId: '955460241936'
    };
    firebase.initializeApp(config);
  }

  render() {
    const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));
    return (
      <Provider store={store}>
        <Router />
      </Provider>
    );
  }
}

export default App;
