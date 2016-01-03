'use strict';
angular.module('canaryApp').controller('MainCtrl', function ($scope, $http, ApiService) {

	$scope.setPoints = function() {
		ApiService.score.get();
	};

});
