import React from 'react';
import './App.css';
import { DataService } from './common';
import {
    StateProvider,
    initialState,
    reducer
} from './common/services/state.service';
import MainContainer from './components/MainContainer';

function App() {
    initialState.cartLines = DataService.getAllProducts().map(item => {
        return { ...item, quantity: 0, total: 0 };
    });

    return (
        <StateProvider initialState={initialState} reducer={reducer}>
            <div id="root">
                <MainContainer />
            </div>
        </StateProvider>
    );
}

export default App;
