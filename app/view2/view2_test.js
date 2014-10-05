'use strict';

/* jasmine specs for controllers go here */
describe('View2 controllers', function() {

  beforeEach(function(){
    this.addMatchers({
      toEqualData: function(expected) {
        return angular.equals(this.actual, expected);
      }
    });
  });

  beforeEach(module('myApp.view2'));

  describe('myApp.view2 module', function() {
  	var scope, ctrl;

  	beforeEach(inject(function($rootScope, $controller) {
  		scope = $rootScope.$new();
  		ctrl = $controller('View2Ctrl', {$scope: scope});
  	}));  

  	it('should ....', function() {
  		
  		expect(ctrl).toBeDefined();
  	});

  });
});