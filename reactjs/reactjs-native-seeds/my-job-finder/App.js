import Expo, { Notifications } from 'expo';
import React from 'react';
import { StyleSheet, Alert } from 'react-native';
import { TabNavigator, StackNavigator } from 'react-navigation';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';


import registerForNotifications from './services/push_notifications';

import store from './store';

import AuthScreen from './screens/AuthScreen';
import WelcomeScreen from './screens/WelcomeScreen';
import MapScreen from './screens/MapScreen';
import DeckScreen from './screens/DeckScreen';
import SettingsScreen from './screens/SettingsScreen';
import ReviewScreen from './screens/ReviewScreen';

export default class App extends React.Component {

  componentDidMount() {
    registerForNotifications();
    Notifications.addListener((notification) => {
      const { data: { text }, origin } = notification;

      if (origin === 'received' && text) {
        Alert.alert(
          'New Push notification',
          text,
          [{ text: 'Ok.' }]
        );
      }
    });
  }

  render() {
    const MainNavigator = TabNavigator({
      welcome: { screen: WelcomeScreen },
      auth: { screen: AuthScreen },
      main: {
        screen: TabNavigator({
          map: MapScreen,
          deck: DeckScreen,
          review: {
            screen: StackNavigator({
              review: { screen: ReviewScreen },
              settings: { screen: SettingsScreen },
            })
          }
        }, {
            tabBarPosition: 'bottom',
            swipeEnabled: false,
            tabBarOptions: {
              labelStyle: { fontSize: 12 }
            }
          }
        )
      }
    }, {
        navigationOptions: {
          tabBarVisible: false,
        },
        lazy: true
      });

      // console.log('JES store', store.store);
      // console.log('JES persistor', store.persistor);
      //        <PersistGate loading={null} persistor={store.persistor}>
      // </PersistGate>


    return (
      <Provider store={store.store}>
          <MainNavigator />
      </Provider>
    );
  }
}
