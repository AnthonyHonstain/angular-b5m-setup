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
    Need to keep in mind that invoking resource immediately returns an empty reference,
    once the data is returned from the server the existing refernce is populated.
    https://docs.angularjs.org/api/ngResource/service/$resource
    */

    /*
    Starting to work towards using a REST resource to source all this data.
    */
    // LIST
    $scope.test = SetupManager.query();
    // GET
    /* 
    var simpleGet = SetupManager.get({'pk':2}, function() {
      // This is only needed if I want to do some additiona work with the result here (like an update)
      $scope.test = simpleGet;
    });
    */

    // POST
    /*
    $scope.test = new SetupManager();
    $scope.test.title = 'foobar';
    $scope.test.code = 'hello foo world';
    SetupManager.save($scope.test);
    */
    
    // Update
    var test1 = SetupManager.get({'pk':2}, function() {
      $scope.before = test1;
      $scope.before.code = 'aaaaaaa';
      $scope.before.$update();
    });
    
    
    var test2 = SetupManager.get({'pk':2}, function() {
      $scope.after = test2;
    });
   }
]);
