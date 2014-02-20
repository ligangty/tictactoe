(function(ng) {
	'use strict';

	/* Directives */
	var tictactoeDirectives = ng.module('tictactoeDirectives', []);

	tictactoeDirectives.directive("roomsDirective", function() {
		function Link($scope, element, attrs) {
			$scope.$watch('rooms', function() {
				if ($scope.rooms) {
					console.log($scope.rooms);
				}
			});
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
			"playClickService",
			function($compile, playClickService) {
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
						}
						console.log(winResult);
						// $scope.image = playClickService.changeImageType();
					});
				}

				return {
					restrict : "A",
					// scope:{
					// clickHandler: "&ngClick" //binding click
					// function to
					// controller function
					// },
					link : Link
				};
			} ]);
})(angular);