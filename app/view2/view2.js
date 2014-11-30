  'use strict';

var view2Controllers = angular.module('myApp.view2', ['ngRoute'])

view2Controllers.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view2', {
    templateUrl: 'view2/view2.html',
    controller: 'View2Ctrl'
  }).when('/view2new', {
    templateUrl: 'view2/setup-add.html',
    controller: 'SetupAdd'
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

