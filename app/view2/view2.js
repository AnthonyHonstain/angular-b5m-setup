  'use strict';

var view2Controllers = angular.module('myApp.view2', ['ngRoute']);

view2Controllers.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view2', {
    templateUrl: 'view2/view2.html',
    controller: 'View2Ctrl'
  }).when('/view2new', {
    templateUrl: 'view2/setup-add.html',
    controller: 'SetupAdd'
  }).when('/view2update/:pk', {
    templateUrl: 'view2/setup-update.html',
    controller: 'SetupUpdate'
  });
}])

view2Controllers.controller('View2Ctrl', ['$scope', '$location', 'SetupManager',
	function($scope, $location, SetupManager) {

    // LIST
    $scope.test = SetupManager.query();

    $scope.deleteSetup = function(setup) {
      setup.$delete(function() {
        // This will update the list after they click delete.
        $scope.test = SetupManager.query();
      });
    };

    $scope.view2Update = function(pk) {
      $location.path('/view2update/' + pk);
    };
   }
]);

view2Controllers.controller('SetupAdd', ['$scope', '$location', 'SetupManager',
  function($scope, $location, SetupManager) {
    $scope.setup = new SetupManager();
    $scope.submit = function() {
      $scope.setup.$save(function() {
        $location.path('/view2');
      });    
    };
  }
]);

view2Controllers.controller('SetupUpdate', ['$scope', '$routeParams', '$location', 'SetupManager',
  function($scope, $routeParams, $location, SetupManager) {

    var simpleGet = SetupManager.get({'pk':$routeParams.pk}, function() {
      $scope.setup = simpleGet;
    });

    $scope.submit = function() {

      $scope.setup.$update(function() {
        $location.path('/view2');
      }, function(data, status) {
        // Handle the error
        if ('value' in data.data)
        {
          $scope.form['value'].$dirty = true;
          $scope.form['value'].$setValidity(false);
        }
      });
    };


  }
]);
