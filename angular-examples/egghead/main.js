var myApp = angular.module('myApp', []);
myApp.factory('Data' , function() {
  return {message: "Esto es un dato de un servicio"}
})

myApp.filter('reverse' , function() {
	return function(text) {
		return text.split("").reverse().join("");
	}
})

function FirstCtrl($scope,Data) {
  $scope.data = Data;
}

function SecondCtrl($scope,Data) {
  $scope.data = Data;

  $scope.reverseMessage = function(message) {
  	return message.split("").reverse().join("");
  }
}