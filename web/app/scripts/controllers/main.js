'use strict';

angular.module('canaryApp').controller('MainCtrl', function ($scope, $http, $timeout, $interval, ApiService) {

	var phone = ATT.rtc.Phone.getPhone();
	var myDHS = null;
	var accessToken = null;
	var myDHSURL = '@attwebrtc.com';



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
					$scope.hide.leakAlert = false;
				} else {
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
			$scope.dispatcher.sent = true;
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

	$scope.dispatcher = { sent: false };

	$scope.markArea = function () {
		ApiService.areas.mark(true);
	};

	$scope.callDispatcher = function () {
		dailThePhone();
		$scope.hide.video = false;
	};

	$scope.hangup = function () {
		phone.hangup();
		$scope.hide.video = true;
	};

	$scope.hide = {
		video: true,
		leakAlert: true
	};

	$scope.webrtc = {
		error: false,
		restarting: false
	};

	$scope.imageMode = {
		mode: "city"
	};

	var initWebRtc = function () {
		$http.get('https://www.attwebrtc.com/hackathon/demo/dhs/config.php').then(function (result) {
			myDHS = result.data;
			getAccessToken();
		});
	};

	initWebRtc();


	$scope.restartWebRTC = function () {
		$scope.webrtc.error = false;
		$scope.webrtc.restarting = true;
		initWebRtc();
	};


	var getAccessToken = function () {
		$http.post('https://www.attwebrtc.com/hackathon/demo/dhs/token.php', JSON.stringify({ app_scope: "ACCOUNT_ID" })).then(function (result) {
			accessToken = result.data;
			phone.associateAccessToken({
				userId: 'canaryMain',
				token: accessToken.access_token,
				success: function () {
					phone.login({ token: accessToken.access_token });

				},
				error: function () {
					phone.logout();
				}
			});
		});
	};

	var dailThePhone = function () {
		phone.dial({
			destination: phone.cleanPhoneNumber("canaryDispatch" + myDHSURL),
			mediaType: 'video',
			localMedia: $('#local')[0],
			remoteMedia: $('#remote')[0]
		});
	};


	phone.on('error', function () {
		$scope.webrtc.error = true;
	});
});
