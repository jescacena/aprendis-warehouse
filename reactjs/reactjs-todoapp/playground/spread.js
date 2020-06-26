// //First example: spread array as arguments of a function
// function add(a,b) {
//   return a + b;
// }
//
// console.log(add(2,3));
//
// var toAdd = [9,5];
// console.log(add(...toAdd));
//
// //SEcond example: combine arrays
// var groupA = ['Pepe' , 'Paco'];
// var groupB = ['Angela'];
//
// var final = [...groupB,3, ...groupA];
//
// console.log(final);

var person = ['Oscar',23];
var personTwo = ['Godofredo',26];

function sayAge(name1,age1, name2,age2) {
  console.log('Hi ' + name1 + ' your age is ' + age1);
  console.log('Hi ' + name2 + ' your age is ' + age2);

}

sayAge(...person,...personTwo);
