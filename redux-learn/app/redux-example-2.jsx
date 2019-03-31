var redux = require('redux');

console.log('Starting redux example');

var stateDefault = {
  name:'Anonymous',
  hobbies:[],
  map:{}
};


//Name reducers and action generators



//Hobbies reducers and action generator
var actions = require('./actions/index');
var store = require('./store/configureStore').configure();

//Subscribe to changes
var unsubscribe = store.subscribe(()=> {
 var state = store.getState();

 console.log('State object is ' , state);
 // console.log('Hobbies are ' , state.hobbies);

 // document.getElementById('app').innerHTML = state.name;

 if(state.map.isFetching) {
   document.getElementById('app').innerHTML = 'Loading...';
 } else if(state.map.url) {
   document.getElementById('app').innerHTML = '<a href="'+state.map.url+'" target="_blank">View your location</a>';

 }
});
// unsubscribe();
store.dispatch(actions.fetchLocation());

store.dispatch(actions.changeName('Gran Wyoming'));
store.dispatch(actions.addHobby('running'));
store.dispatch(actions.addHobby('walking'));
store.dispatch(actions.removeHobby(2));
store.dispatch(actions.changeName('Elisa Beni'));
