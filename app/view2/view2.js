'use strict';

var view2Controllers = angular.module('myApp.view2', ['ngRoute'])

view2Controllers.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view2', {
    templateUrl: 'view2/view2.html',
    controller: 'View2Ctrl'
  });
}])

view2Controllers.controller('View2Ctrl', ['$scope',
	function($scope) {
		$scope.setup = {
			'front_camber': -1,
			'front_toe': 0,
  		'front_ride_height': 23, // TODO - consider units
  	}
  }
]);
