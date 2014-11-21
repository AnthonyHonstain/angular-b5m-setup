'use strict';

var view2Controllers = angular.module('myApp.view2', ['ngRoute'])

view2Controllers.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view2', {
    templateUrl: 'view2/view2.html',
    controller: 'View2Ctrl'
  });
}])

view2Controllers.controller('View2Ctrl', ['$scope', 'SetupManager',
	function($scope, SetupManager) {
		$scope.setup = {
			'front_camber': -1,
			'front_toe': 2,
  		'front_ride_height': 23, // TODO - consider units
  	};

    /*
    Starting to work towards using a REST resource to source all this data.
    */
    $scope.test = SetupManager.query();

  }
]);
