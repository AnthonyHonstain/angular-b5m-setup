'use strict';

var authviewControllers = angular.module('myApp.authview', ['ngRoute']);

authviewControllers.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/authview', {
    templateUrl: 'authview/authview.html',
    controller: 'AuthCtrl'
  }).when('/dashboardfoo', {
    templateUrl: 'authview/dashboardtemp.html',
    controller: 'DashboardCtrl'
  });
}])

authviewControllers.controller('AuthCtrl', ['$scope', '$location', 'AuthService',
  function($scope, $location, AuthService, $log) {
    
    console.log("HELLOW WORLD");
    $scope.register = function () {
      var username = $scope.registerUsername;
      var password = $scope.registerPassword;

      if (username && password)
      {
        AuthService.register(username, password).then(
          function () {
            $location.path('/dashboard');
          },
          function () {
            $scope.registerError = error;
          }
          );
      } else
      {
        $scope.registerError = 'Username and password required';
      }
    }

  }
]);

authviewControllers.controller('DashboardCtrl', ['$scope', '$window', '$location',
  function($scope, $window, $location) {
    console.log("CHECK AUTH");
    if (!$window.localStorage.token) {
      console.log("NOT AUTHORIZED");
      //$location.path('/');
      return;
    }
    $scope.token = $window.localStorage.token;
    $scope.username = $window.localStorage.username;
  }
]);