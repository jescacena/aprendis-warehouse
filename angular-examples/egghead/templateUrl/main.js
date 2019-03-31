var myApp = angular.module('myApp', []);
myApp.factory('Data' , function() {
  return {message: "Esto es un dato de un servicio"}
})

myApp.directive('myDirective' , function() {
	return {
      restrict: 'E',
      templateUrl: 'myTemplate.html',
      link: function() {
        console.log("Estoy en la consola log del link");
      }
	}
})
