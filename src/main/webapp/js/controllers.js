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
				$scope.loaderShow=false;
				$scope.roomShow=false;
				$scope.loaderImage="/tictactoe/images/loader.gif";
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
					$scope.loaderShow=true;
					Room.query(function(data) {
						$scope.rooms = data;
						$scope.loaderShow=false;
						$scope.roomShow=true;
					});
				}
				$scope.createRoom = function() {
					var newRoom = {};
					newRoom.creator = $scope.user;
					Room.save(newRoom, function(data) {
						$scope.newRoom = data;
						$scope.$broadcast("NEW_ROOM_UPDATE", {
							updatedRoom : $scope.newRoom
						});
						$location.path("/play/" + $scope.newRoom.roomId);
					});

				};
				
			} ]);

	tictactoeControllers.controller('PlayCtrl', [ '$scope', '$routeParams',
			'$location', 'Room',function($scope, $routeParams, $location, Room) {
				$scope.room = Room.get({roomId:$routeParams.roomId},function(data){
					
				});
				// this handleplay function is binded to directive ng-click attribute
//				$scope.handlePlay= function(){
//					console.log("handle play triggered!");
//				};
			} ]);

})(angular);