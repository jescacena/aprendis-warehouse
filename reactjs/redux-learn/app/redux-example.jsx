var redux = require('redux');

console.log('Starting redux example');

//Pure function
function add(a,b) {
  return a + b;
}


//We return a new object
function changeProp(obj) {
  return {
    ...obj,
    name: 'Ruben'
  };
}

var startingValue = {
  name: 'Indira'
};
var res = changeProp(startingValue);

console.log(startingValue);
console.log(res);
