'use strict';
angular.module('canaryApp').controller('MainCtrl', function ($scope, $http, $timeout, ApiService) {

	$scope.setPoints = function() {
		ApiService.score.get();
	};

	$scope.audioPipeBurst = function() {
		var audio = new Audio('audio/warning.wav');
		audio.play();
	};

	$scope.audioDispatch = function() {
		var audio = new Audio('audio/herewego.wav');
		audio.play();

		$timeout(function() {
			var audio2 = new Audio('audio/pipe.wav');
			audio2.play();

			$timeout(function() {
				var audio3 = new Audio('audio/underworld - cut.mp3');
				audio3.play();
			}, 1000);

		}, 1000);
	};

	$scope.audioFix = function() {
		var audio = new Audio('audio/powerup.wav');
		audio.play();

		$timeout(function() {
			var audio2 = new Audio('audio/stageclear.wav');
			audio2.play();
		}, 1000);
	};

});
