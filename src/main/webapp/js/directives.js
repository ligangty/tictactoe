(function(ng) {
	'use strict';

	/* Directives */
	var tictactoeDirectives = ng.module('tictactoeDirectives', []);

	tictactoeDirectives.directive("roomsDirective", function() {
		function Link($scope, element, attrs, ctrl) {
			console.log($scope);
			console.log(element);
			console.log(attrs);
			console.log($scope.rooms);
			scope.$watch('rooms',function(){
				console.log($scope.rooms);
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