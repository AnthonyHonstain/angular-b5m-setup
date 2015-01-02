'use strict';

var authviewControllers = angular.module('myApp.authview', ['ngRoute']);

authviewControllers.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/authview', {
    templateUrl: 'authview/authview.html',
    controller: 'AuthCtrl'
  }).when('/dashboard', {
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
        console.log("ATTEMPTING AUTH");
        AuthService.register(username, password).then(
          function () {
            console.log("AUTH WORKED!");
            $location.path('/dashboard');
          },
          function (error) {
            console.log("AUTH ERROR");
            $scope.registerError = error;
          }
          );
      } else {
        $scope.registerError = 'Username and password required';
      }
    };

    $scope.login = function () {
      var username = $scope.loginUsername;
      var password = $scope.loginPassword;

      if (username && password)
      {
        AuthService.login(username, password).then(
          function () {
            console.log("AUTH WORKED!");
            $location.path('/dashboard');
          },
          function (error) {
            console.log("AUTH ERROR");
            $scope.registerError = error;
          });
      } else
      {
        $scope.registerError = 'Username and password required';
      }
    };

  }
]);

authviewControllers.controller('DashboardCtrl', ['$scope', '$window', '$location', 'AuthService', 'AuthStatusService',
  function($scope, $window, $location, AuthService, AuthStatusService) {
    console.log("CHECK AUTH");
    if (!$window.localStorage.token) {
      console.log("NOT AUTHORIZED");
      $location.path('/authview');
      return;
    }
    console.log("AUTHORIZED")
    $scope.token = $window.localStorage.token;
    $scope.username = $window.localStorage.username;

    var simpleGet = AuthStatusService.get({}, function() {
      $scope.serverUsername = simpleGet.username;
      $scope.status = simpleGet.is_active;
    });

    $scope.logout = function () {
      AuthService.logout().then(
        function () {
          $location.path('/');
        },
        function (error) {
          $scope.error = error;
        });
    };
  }
]);
