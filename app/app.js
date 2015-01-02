'use strict';

/* global app: true */

/*
NOTE - this is similar to the tutorial step 7 - https://docs.angularjs.org/tutorial/step_07
*/

// Declare app level module which depends on views, and components
var app = angular.module('myApp', [
  'ngRoute',
  'ngResource',
  'ngSanitize',
  'ngCookies',

  'myApp.view1',
  'myApp.view2',
  'myApp.authview',
  'myApp.version',

  'ui.bootstrap',

  'setupManagerServices',
  'authService',
  'authStatusService'
]).config(['$routeProvider', '$httpProvider', 
  function($routeProvider, $httpProvider) 
  {
    $httpProvider.interceptors.push('AuthInterceptor');
    //$routeProvider.otherwise({redirectTo: '/view1'});

    //Enable cross domain calls
    $httpProvider.defaults.useXDomain = true;
  }
]);

app.constant('API_SERVER', 'http://127.0.0.1:8000/api')

/* I am clearly not groking how to break this into multiple modules.
var app = angular.module('frontendApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute',
  'frontendApp.authview'
]).config(['$routeProvider', '$httpProvider',
  function($routeProvider, $httpProvider)
  {
    //$routeProvider.otherwise({redirectTo: '/authview'});

    //Enable cross domain calls
    $httpProvider.defaults.useXDomain = true;
  }
]);

app.constant('API_SERVER', 'http://127.0.0.1:8000/api')
*/