(function(ng) {
	'use strict';

	/* Services */

	var tictactoeRestServices = ng.module('tictactoeRestServices',
			[ 'ngResource' ]);

	tictactoeRestServices.factory('User', [ '$resource', function($resource) {
		return $resource("/tictactoe/api/user");
	} ]);

	tictactoeRestServices.factory('Room', [ '$resource', function($resource) {
		return $resource("/tictactoe/api/room");
	} ]);

	var pageHandlingServices = ng.module("pageHandlingServices", []);

	pageHandlingServices
			.factory(
					'playClickService',
					function() {
						var BLOCK_IMAGE = "/tictactoe/images/block.gif", CIRCLE_IMAGE = "/tictactoe/images/circle.gif";
						var ticMatrix = [ {}, {}, {}, {}, {}, {}, {}, {}, {} ], currentImageType = 'init';
						return {
							changeImageType : function() {
								if (currentImageType === "block") {
									currentImageType = "circle";
									return CIRCLE_IMAGE;
								} else {
									currentImageType = "block";
									return BLOCK_IMAGE;
								}
							}
						};
					});

})(angular);