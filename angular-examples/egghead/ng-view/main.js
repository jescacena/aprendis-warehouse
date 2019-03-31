var myApp = angular.module('myApp', ['ngRoute']);

myApp.config(function($routeProvider) {
    $routeProvider.when('/',{
        templateUrl:'uno.html',
        controller:'UnoCtrl'
    })
})

myApp.controller('UnoCtrl', function($scope) {
    $scope.model = {
        message : "This is my ng-view app"
    };
})
