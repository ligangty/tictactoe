(function(ng) {
	'use strict';

	/* Directives */
	var tictactoeDirectives = ng.module('tictactoeDirectives', []);

	tictactoeDirectives.directive("roomsDirective", function() {
		function Link($scope, element, attrs) {
//			$scope.$watch('rooms', function() {
//				if ($scope.rooms) {
//					console.log($scope.rooms);
//				}
//			});
			$scope.$on("NEW_ROOM_UPDATE", function(event, data) {
				var room = data.updatedRoom;
				element.append("<div class='xxdiv'>" + room.roomId + ","
						+ room.isOpen + "</div>");
			});
		}
		return {
			restrict : "A",
			link : Link
		};
	});

	tictactoeDirectives.directive("playDirective", [
			"$compile",
			"$rootScope",
			"playClickService",
			function($compile, $rootScope, playClickService) {
				function Link($scope, element, attrs) {
					element.on("click", function(event) {
						var needChange = playClickService
								.setPlayerAction($scope.index);
						if (needChange.needChange) {
							$scope.imageUrl = needChange.image;
							if ($.trim(element.html()) === "") {
								element.append($compile(
										"<img ng-src='{{imageUrl.image}}' />")(
										$scope));
							}
						}

						var winResult = playClickService.decideWinner();
						if (winResult.isWin) {
							alert("Game Over!Congratulatios! user "
									+ winResult.winner + " is winer!");
							// as game winning, broad cast "GAME_OVER" event to
							// notify all playDirectives to unbind click
							// function
							$rootScope.$broadcast("GAME_OVER");
						}
						// when a click on this directive triggered, unbind it.
						element.off("click");
						// $scope.image = playClickService.changeImageType();
					});

					// let all playDirectives bind a event listener of
					// "GAME_OVER" event to disable all click event listeners on
					// them when game is over
					$scope.$on("GAME_OVER", function(event) {
						element.off("click");
					});
				}

				return {
					restrict : "A",
					// scope:{
					// clickHandler: "&ngClick" //binding click
					// function to
					// controller function
					// },
					scope : false,
					link : Link
				};
			} ]);
})(angular);