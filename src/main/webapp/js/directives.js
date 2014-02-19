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
						$scope.imageUrl = playClickService.changeImageType();
						if ($.trim(element.html()) === "") {
							element.append($compile(
									"<img ng-src='{{imageUrl}}' />")($scope));
						}
						console.log("div " + $scope.index + " clicked!");
					});
				}
				;

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