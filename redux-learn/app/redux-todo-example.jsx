var redux = require('redux');

console.log('Starting redux example');

var reducer = (state = {
                searchText:undefined,
                showCompleted:false,
                todos:[]
              }, action) => {

                switch(action.type) {
                  case 'CHANGE_SEARCH_TEXT':
                    return {
                      ...state,
                      searchText:action.text
                    };
                  default:
                    return state;
                }
  return state;
};
var store = redux.createStore(reducer);

var currentState = store.getState();

console.log('currentState', currentState)


var action = {
  type:'CHANGE_SEARCH_TEXT',
  text:'Something in the way'
};

store.dispatch(action);

console.log('Should set search text correctly', store.getState())
