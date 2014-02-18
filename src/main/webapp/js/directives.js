(function(ng) {
	'use strict';
	
	var BLOCK_IMAGE = "/tictactoe/images/block.gif";
	var CIRCLE_IMAGE = "/tictactoe/images/circle.gif";

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

	tictactoeDirectives
			.directive(
					"playDirective",
					[
							"$compile",
							function($compile) {
								function Link($scope, element, attrs) {
									$scope.ticMatrix = [ {}, {}, {}, {}, {},
											{}, {}, {}, {} ];
									
									
									element
											.on(
													"click",
													function(event) {
														if ($scope.currentImageType === "block") {
															console.log($scope.currentImageType);
															console.log($scope.imageUrl);
															$scope.currentImageType = "circle";
															$scope.imageUrl = CIRCLE_IMAGE;
														} else{
															console.log($scope.currentImageType);
															console.log($scope.imageUrl);
															$scope.currentImageType = "block";
															$scope.imageUrl = BLOCK_IMAGE;
														}
														if ($.trim(element
																.html()) === "") {
															element
																	.append($compile(
																			"<img ng-src='{{imageUrl}}' />")
																			(
																					$scope));
														}
														console.log("div "
																+ $scope.index
																+ " clicked!");
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