var deferredPrompt;

if(!window.Promise) {
    window.Promise = Promise;
}

if ("serviceWorker" in navigator) {
    navigator.serviceWorker
    .register("./sw-workbox.js")
    .then(function () {
        console.log('SW registered!');        
    });
}

// const myPromise = new Promise(function(resolve,reject) {
//     setTimeout(() => {
//         // resolve('Timer is done!');
//         reject({code:500, message:'Request error!'})
//     }, 2000);
// });
fetch("http://httpbin.org/get").then(function(response) {
    console.log(response);
    return response.json();
}).then(function(data) {
    console.log(data);
}).catch(function(err) {
    console.log(err);
});
// var xhr = new XMLHttpRequest();
// xhr.open('GET', 'http://httpbin.org/get');
// xhr.reponseType = 'json';

// xhr.onload = function() {
//     console.log(xhr.response);
// }

// xhr.onerror = function() {
//     console.log('error!');
// }

// xhr.send();


// fetch("http://httpbin.org/post", {
//     method: 'POST',
//     headers: {
//         'Content-Type': 'application/json',
//         'Accept': 'application/json'
//     },
//     mode:'no-cors',
//     body: JSON.stringify({message:'Jander Clander'})
// }).then(function(response) {
//     console.log(response);
//     return response.json();
// }).then(function(data) {
//     console.log(data);
// }).catch(function(err) {
//     console.log(err);
// });

// myPromise.then(function(text) {
//     return text;
// }).then(function(newText) {
//     console.log(newText);
// }).catch(function(errorObj) {
//     console.log('Error in operation:', errorObj.code, errorObj.message);
// });

// console.log('After timeout code');




