'use strict';

/* Services */

var setupManagerServices = angular.module('setupManagerServices', ['ngResource']);

setupManagerServices.factory('SetupManager', ['$resource',
	function($resource){
		/*
		return $resource('setups/:setupId.json', {}, {
			query: {method:'GET', params:{setupId: 'setups'}, isArray:true}
		});
	  */
	  
	  /*
	     XMLHttpRequest cannot load http://localhost:8000/snippets/snippets. 
	     No 'Access-Control-Allow-Origin' header is present on the requested 
	     resource. Origin 'http://localhost:3000' is therefore not allowed access. 
	  */
	  return $resource('http://localhost:8000/snippets/snippets/:pk', 
	  	{ pk: '@_pk' },
	  	{
	  		update: {
	  			method: 'PUT',
	  			params: {
	  				pk: "@pk"
          }
	  		},
	  		delete: {	
	  			method: 'DELETE',
	  			params: {
	  				pk: "@pk"
          }
	  		}
	  	},{ // Not sure this is a good idea, or even matters in my version of angular.
	  		stripTrailingSlashes: false
	  	}

	  ); // Note the full endpoint address

	}
	]);


/*
Creating a ghetto endpoint on the django side to experiment with the
token auth getting set correctly - NOT a full fledged REST endpoint.
Just a proof of concept before I tried modifying something larger.
*/
var authStatusService = angular.module('authStatusService', ['ngResource']);

authStatusService.factory('AuthStatusService', ['$resource',
	function($resource){
	  return $resource('http://localhost:8000/api/account_status'

	  ); 
	}
	]);

var authService = angular.module('authService', []);

authService.factory('AuthService', function($http, API_SERVER, $q, $window) 
	{

		var authenticateTool = function (username, password, endpoint) 
		{
			var url = API_SERVER + endpoint;
			// Create the promise, we are deferring the $http.post promise to laster
			var deferred = $q.defer();
			
			$http.post(url, 'username=' + username + '&password=' +  password, {
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded'
				}
			}).then( 
			function (response) {
				var token = response.data.token;
				var username = response.data.username;

				if (token && username) {
					$window.localStorage.token = token;
					$window.localStorage.username = username;
					deferred.resolve(true);				
				} else {
					deferred.reject('Invalid data received from server');					
				}
			},
			function (response) {
				console.log('Error response:', response.data);
				deferred.reject(response.data.error);
		  }		
			);
			
			return deferred.promise;
		}

		var logout = function()
		{
			var deferred = $q.defer();
			var url = API_SERVER  + '/logout';

		  // Note - we are not trying to set the token for this call to the
			// server here, we want a generalized way to include the token in the header.
			$http.post(url).then(
				function () {
					$window.localStorage.removeItem('token');
					$window.localStorage.removeItem('username');
					deferred.resolve(true);		
				},
				function (error) {
					deferred.reject(error.data.error);
				}
			);

			return deferred.promise;
		}

		return {
		 register: function (username, password) {
				return authenticateTool(username, password, '/register');
			},
			login: function (username, password) {
				return authenticateTool(username, password, '/login');
			},
			logout: function() {
				return logout();
			}
		}
	});
