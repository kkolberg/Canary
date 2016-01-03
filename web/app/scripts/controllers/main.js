'use strict';

angular.module('canaryApp').controller('MainCtrl', function ($scope, $http, $timeout, $interval, ApiService) {


	$scope.setPoints = function () {
		ApiService.score.get();
	};

    var pipe1Leaking = false;

	var pollingLeaks = function () {
		ApiService.pipes.get().then(function (result) {
			var isLeaking = result.data.pipe1.isLeaking;

			if (pipe1Leaking !== isLeaking) {
				if (isLeaking) {
					$scope.audioPipeBurst();
				}else{
					$scope.audioFix();
				}

				pipe1Leaking = isLeaking;
			}
		});
	};

	var polling = $interval(pollingLeaks, 1000);

	$scope.audioPipeBurst = function () {
		var audio = new Audio('audio/warning.wav');
		audio.play();
	};

	$scope.audioDispatch = function () {
		var audio = new Audio('audio/herewego.wav');
		audio.play();

		$timeout(function () {
			var audio2 = new Audio('audio/pipe.wav');
			audio2.play();

			$timeout(function () {
				var audio3 = new Audio('audio/underworld - cut.mp3');
				audio3.play();
			}, 1000);

		}, 1000);
	};

	$scope.audioFix = function () {
		var audio = new Audio('audio/powerup.wav');
		audio.play();

		$timeout(function () {
			var audio2 = new Audio('audio/stageclear.wav');
			audio2.play();
		}, 1000);
	};

});
