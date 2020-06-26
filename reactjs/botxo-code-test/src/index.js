import React, { Component } from "react";
import ReactDOM from 'react-dom';
import styles from './global'
import { createStore } from 'redux'
import { Provider } from 'react-redux'

import rootReducer from './reducers'


import MainContainer from './components/container/MainContainer';

const store = createStore(rootReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
 );


// ========================================

ReactDOM.render(
    <Provider store={store}>
        <MainContainer />
    </Provider>,

    document.getElementById('root')
);