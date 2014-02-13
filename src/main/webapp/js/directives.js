(function(ng) {
	'use strict';

	/* Directives */
	var tictactoeDirectives = ng.module('tictactoeDirectives', []);

	tictactoeDirectives.directive("roomsDirective", function() {
		function Link($scope, element, attrs, ctrl) {
			console.log($scope);
			console.log(element);
			console.log(attrs);
			$scope.$watch('rooms',function(){
				if($scope.rooms){
					console.log($scope.rooms);
				}
			});
			$scope.$on("NEW_ROOM_UPDATE",function(event, data){
				var room = data.updatedRoom;
				element.append("<div class='xxdiv'>"+room.roomId+","+room.isOpen+"</div>");
			});
		}
		return {
			restrict : "A",
//			require: "roomsDirective",
//			controller: function($scope){
//				console.log("directive controller:");
//				console.log($scope);
//			},
			link: Link
		};
	});
})(angular);