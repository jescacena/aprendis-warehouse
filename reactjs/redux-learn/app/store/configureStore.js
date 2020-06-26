var redux = require('redux');
var thunk = require('redux-thunk').default;
var {nameReducer, hobbiesReducer, mapReducer} = require('./../reducers/index.js');

export var configure = () => {
  var reducer = redux.combineReducers({
      name: nameReducer,
      hobbies: hobbiesReducer,
      map: mapReducer
  });

  var store = redux.createStore(reducer,  redux.compose(
    redux.applyMiddleware(thunk),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  ));

  return store;
};
