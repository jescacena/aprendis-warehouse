var app = angular.module("app", []);

app.controller("MyCtrl", function ($scope) {
    console.log($scope);
});

app.controller("MyCtrl2", ["$scope", function($scope) {}]);

ap.directive("myDirective", function () {
    return {
        link: function(scope) {
            console.log(scope);
        }
    }
});