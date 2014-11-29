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
	  		}
	  	},{ // Not sure this is a good idea, or even matters in my version of angular.
	  		stripTrailingSlashes: false
	  	}

	  ); // Note the full endpoint address

	}
	]);
