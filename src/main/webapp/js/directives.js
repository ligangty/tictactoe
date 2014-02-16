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

	tictactoeDirectives.directive("playDirective", function() {
		function Link($scope, element, attrs) {

		}

		return {
			restrict : "A",
			link : Link
		};
	});
})(angular);