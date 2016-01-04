'use strict';

angular.module('canaryApp').controller('MainCtrl', function ($scope, $http, $timeout, $interval, ApiService) {

  var projectAPIKey = "DAK533478a20a774b118a92409ed7031845";
  var username = "user1@attwebrtc0228.kandy.io";
  var password = "atthack123";



  var onCallInitiated =function(call, callee) {

    // Store the call id, so the caller has access to it.
    callId = call.getId();


  };

  kandy.setup({
    // Designate HTML elements to be our stream containers.
    remoteVideoContainer: $("#remote")[0],
    localVideoContainer: $("#local")[0],
    listeners: {
      callinitiated: onCallInitiated}
  });

// Login automatically as the application starts.
  kandy.login(projectAPIKey, username, password, function(){}, function(){});

  $scope.setPoints = function () {
    ApiService.score.get();
  };

  var pipe1Leaking = false;

  var pollingLeaks = function () {
   // return   $scope.hide.leakAlert = false;
    ApiService.pipes.get().then(function (result) {
      var isLeaking = result.data.pipe1;

      if (pipe1Leaking !== isLeaking) {
        if (isLeaking) {
          $scope.audioPipeBurst();
          $scope.hide.leakAlert = false;
        }

        pipe1Leaking = isLeaking;
      }
    });
  };
  var callId;
  var polling = $interval(pollingLeaks, 2500);


  $scope.resolve = function () {
    ApiService.pipes.fix();
    $scope.audioFix();
    $scope.hide.leakAlert = true;

  };

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

  $scope.flow = { step: "dispatch" };

  $scope.markArea = function () {
    ApiService.areas.mark(true);
  };

  $scope.changeStep = function (nextStep) {
    $scope.flow.step = nextStep;
  }

  $scope.callDispatcher = function () {


    // Tell Kandy to make a call to callee.
    kandy.call.makeCall("user2@attwebrtc0228.kandy.io", true);
    $scope.hide.video = false;
  };

  $scope.hangup = function () {
    kandy.call.endCall(callId);
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


});
