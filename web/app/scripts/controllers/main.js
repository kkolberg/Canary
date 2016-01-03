'use strict';
angular.module('canaryApp').controller('MainCtrl', function ($scope, $http, $interval, ApiService) {

	$scope.setPoints = function () {
		ApiService.score.get();
	};

	var pollingLeaks = function () {
		ApiService.pipes.get().then(function (result) {
			console.log(result.data.pipe1);
		});
	};

	var polling = $interval(pollingLeaks, 1000);

});
