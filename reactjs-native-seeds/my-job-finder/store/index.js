import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { persistStore, autoRehydrate, persistReducer } from 'redux-persist';
import { AsyncStorage } from 'react-native';
// import storage from 'redux-persist/lib/storage'; 
// defaults to localStorage for web and AsyncStorage for react-native

import reducers from '../reducers';

// const persistConfig = { storage: AsyncStorage, key: 'root', whiteList: ['likedJobs', 'auth', 'jobs'] };
// const persistedReducer = persistReducer(persistConfig, reducers);

// let store = createStore(
//     compose(
//         applyMiddleware(thunk),
//         persistedReducer
//     ));
// let persistor = persistStore(store);
// persistor.purge();
const store = createStore(
    reducers,
    {},
    compose(
        applyMiddleware(thunk)
    )
);

// const persistor = persistStore(store);

// // persistStore(store, { storage: AsyncStorage, whiteList: ['likedJobs'] }).purge();
// console.log('JES store', store);
// console.log('JES persistor', persistor);

// export default () => {
//     return { store, persistor };
//   };


export default { store };

