'use strict';

/*
NOTE - this is similar to the tutorial step 7 - https://docs.angularjs.org/tutorial/step_07
*/

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ngRoute',
  'ngResource',
  'myApp.view1',
  'myApp.view2',
  'myApp.version',
  'ui.bootstrap',

  'setupManagerServices'
]).config(['$routeProvider', '$httpProvider', 
  function($routeProvider, $httpProvider) 
  {
    $routeProvider.otherwise({redirectTo: '/view1'});

    //Enable cross domain calls
    $httpProvider.defaults.useXDomain = true;
  }
]);


