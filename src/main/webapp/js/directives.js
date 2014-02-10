(function(ng) {
	'use strict';

	/* Directives */
	var tictactoeDirectives = ng.module('tictactoeDirectives', []);

	tictactoeDirectives.directive("roomsDirective", function() {
		return {
			restrict : 'A',
			// require: 'roomsDirective',
			// controller: $RoomsListCtrl,
			link : function(scope, element, attrs, RoomsListCtrl) {
				console.log(element);
				console.log(attrs);
				// scope.$watch(attrs.ngModel,function(){
				//            	
				// });
			}
		};
	});
})(angular);