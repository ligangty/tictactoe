'use strict';

/* Directives */
var tictactoeDirectives = angular.module('tictactoeDirectives', []);

tictactoeDirectives.directive("roomsDirective",function(){
	return {
        restrict: 'A',
        link: function(scope, element, attrs, RoomsListCtrl) {
            scope.$watch(attrs.ngModel,function(){
            	console.log(element);
            	console.log(attrs);
            	console.log(RoomsListCtrl);
            });
        }
    };
});
