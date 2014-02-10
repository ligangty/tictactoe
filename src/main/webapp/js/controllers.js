(function(ng) {

	'use strict';

	/* Controllers */

	var tictactoeControllers = ng.module('tictactoeControllers', []);

	tictactoeControllers
			.controller(
					'RegisterCtrl',
					[
							'$scope',
							'$location',
							'User',
							function($scope, $location, User) {
								$scope.createButtonLabel = "Create";
								$scope.user = {};
								$scope.create = function() {
									User
											.save(
													$scope.user,
													function(data) {
														$scope.message = "";
														$scope.user = data;
														$location
																.path("/rooms/"
																		+ $scope.user.oid);
													},
													function(response) {
														if (response.status == 304) {
															$scope.message = $scope.user.username
																	+ " has been registered, please try another username";
														}
													});

								};
							} ]);

	tictactoeControllers.controller('RoomsListCtrl', [ '$scope',
			'$routeParams', '$location', 'User', 'Room',
			function($scope, $routeParams, $location, User, Room) {
				if (!$scope.user) {
					User.get({
						oid : $routeParams.oid
					}, function(data) {
						$scope.user = data;
					}, function(response) {
						console.log(response);
					});
				}
				if (!$scope.rooms) {
					Room.query(function(data) {
						$scope.rooms = data;
					});
				}
				$scope.createRoom = function() {
					$scope.newRoom = {};
					$scope.newRoom.creator = $scope.user;
					Room.save($scope.newRoom);
				};
			} ]);

	/*
	 * tictactoeControllers.controller('PlayCtrl', ['$scope', '$routeParams',
	 * 'Play', function($scope, $routeParams, Play) {
	 * 
	 * }]);
	 */

})(angular);