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

var authService = angular.module('authService', []);

authService.factory('AuthService', function ($http, API_SERVER) 
	{

		var register = function (username, password) 
		{
			// Create the promise, we are deferring the $http.post promise to laster
			var deferred = $q.defer();
			var url = API_SERVER + 'register/';
			
			$http.post(url, 'username=' + username + '&password=' +  password, {
				headers: {
					'Content-Type': 'application/json'
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
				deferred.reject(response.data.error);
		  }		
			);
			return deferred.promise;
		}

		return {
			register: function (username, password) {
				return register(username, password);
			}
		}
	});
