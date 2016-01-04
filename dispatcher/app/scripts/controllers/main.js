'use strict';

angular.module('canaryApp').controller('MainCtrl', function ($scope, $http, $timeout, $interval, ApiService) {

	
	var projectAPIKey = "DAK533478a20a774b118a92409ed7031845";
	var username = "user2@attwebrtc0228.kandy.io";
	var password = "atthack123";
	var callId = null;

	var onCallIncoming = function (call) {
		//log("Incoming call from " + call.callerNumber);

		// Store the call id, so the callee has access to it.
		callId = call.getId();

		// Handle UI changes. A call is incoming.
		acceptCall();
	}

	var acceptCall = function () {
		// Tell Kandy to answer the call.
		kandy.call.answerCall(callId, true);
		// Second parameter is false because we are only doing voice calls, no video.

		
		// Handle UI changes. Call no longer incoming.
	};


	$scope.hangup = function () {
		kandy.call.endCall(callId);
	};

$scope.fire=function(){
	$http.post('http://54.85.250.47:8080/api/leaks',JSON.stringify({value:1}));
};

$scope.unfire=function(){
	$http.post('http://54.85.250.47:8080/api/leaks',JSON.stringify({value:0}));
};

kandy.setup({
    // Designate HTML elements to be our stream containers.
    remoteVideoContainer: $("#remote")[0],
    localVideoContainer: $("#local")[0],

    // Register listeners to call events.
    listeners: {
        callincoming: onCallIncoming
    }});

kandy.login(projectAPIKey, username, password, function () { }, function () { });


});
