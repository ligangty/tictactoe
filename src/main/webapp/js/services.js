(function(ng) {
	'use strict';

	/* Services */

	// REST services
	var tictactoeRestServices = ng.module('tictactoeRestServices',
			[ 'ngResource' ]);

	// User service to get user related data
	tictactoeRestServices.factory('User', [ '$resource', function($resource) {
		return $resource("/tictactoe/api/user");
	} ]);

	// Rooms service to get room related data
	tictactoeRestServices.factory('Room', [ '$resource', function($resource) {
		return $resource("/tictactoe/api/room");
	} ]);

	// non-REST services
	var pageHandlingServices = ng.module("pageHandlingServices", []);

	// websocket service in play page for real-time commnunication
	pageHandlingServices.factory("playWebsocketService", [
			'$window',
			'$q',
			function($window, $q) {
				var serviceResult = {};
				var webSock;

				function openWebsocket(roomId) {
					var rootUri = getRootUri();
					webSock = new WebSocket(rootUri + "/tictactoe/play/"
							+ roomId);
					webSock.onopen = function() {
						service.callback(idMatch, "CONNECTED");
					};

					webSock.onerror = function() {
						service
								.callback(idMatch,
										"Failed to open a connection");
					};

					webSock.onclose = function() {
						service.callback(idMatch, "DISCONNECTED");
					};

					webSock.onmessage = function(message) {
						service.callback(idMatch, message.data);
					};

				}

				function sendRequest(request) {
					var defer = $q.defer();
					// var callbackId = getCallbackId();
					// callbacks[callbackId] = {
					// time : new Date(),
					// cb : defer
					// };
					// request.callback_id = callbackId;
					console.log('Sending request', request);
					if (webSock !== null) {
						webSock.send(JSON.stringify(request));
					}
					return defer.promise;
				}

				function getRootUri() {
					var protocol = "ws://";
					if (angular.equals($window.location.protocol, 'https:')) {
						protocol = "wss://";
					}
					return protocol
							+ ($window.location.hostname == "" ? "localhost"
									: $window.location.hostname)
							+ ":"
							+ ($window.location.port == "" ? "8080"
									: $window.location.port);
				}

				if ($window.WebSocket) {
					serviceResult = {
						support : false,
						message : "your browser does not support websocket"
					};
				} else {
					serviceResult = {
						support : true,
						socketService : openWebsocket
					};
				}

				return serviceResult;
			} ]);

	// service for front-end play logic
	pageHandlingServices
			.factory(
					'playClickService',
					function() {
						var BLOCK_IMAGE = {
							image : "/tictactoe/images/block.gif",
							type : 1
						}, CIRCLE_IMAGE = {
							image : "/tictactoe/images/circle.gif",
							type : 2
						}, WINNING_RULESET = [ [ 0, 1, 2 ], [ 3, 4, 5 ],
								[ 6, 7, 8 ], [ 0, 3, 6 ], [ 1, 4, 7 ],
								[ 2, 5, 8 ], [ 0, 4, 8 ], [ 2, 4, 6 ] ];
						var ticMatrix = [ {
							type : 0,
							clicked : false
						}, {
							type : 0,
							clicked : false
						}, {
							type : 0,
							clicked : false
						}, {
							type : 0,
							clicked : false
						}, {
							type : 0,
							clicked : false
						}, {
							type : 0,
							clicked : false
						}, {
							type : 0,
							clicked : false
						}, {
							type : 0,
							clicked : false
						}, {
							type : 0,
							clicked : false
						} ];
						var currentImageType = 'init';

						var changeImgType = function() {
							if (currentImageType === "block") {
								currentImageType = "circle";
								return CIRCLE_IMAGE;
							} else {
								currentImageType = "block";
								return BLOCK_IMAGE;
							}
						};

						var setPlayerAct = function(clickedDivIndex) {
							if (ticMatrix[clickedDivIndex].clicked === true) {
								return {
									needChange : false
								};
							} else {
								var changedImage = changeImgType();
								ticMatrix[clickedDivIndex].type = changedImage.type;
								ticMatrix[clickedDivIndex].clicked = true;
								return {
									image : changedImage,
									needChange : true
								};
							}
						};

						var decideWinning = function() {
							for (var index = 0; index < WINNING_RULESET.length; index++) {
								var winRule = WINNING_RULESET[index];
								if ((ticMatrix[winRule[0]].type !== 0)
										&& (ticMatrix[winRule[0]].type === ticMatrix[winRule[1]].type)
										&& (ticMatrix[winRule[0]].type === ticMatrix[winRule[2]].type)) {
									return {
										isWin : true,
										winner : ticMatrix[winRule[0]].type
									};
								}
							}
							return {
								isWin : false
							};
						};

						return {
							setPlayerAction : setPlayerAct,
							changeImageType : changeImgType,
							decideWinner : decideWinning
						};
					});

})(angular);