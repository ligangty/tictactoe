(function(ng) {
	'use strict';

	/* Filters */

	ng.module('tictactoeFilters', []).filter('checkmark', function() {
		return function(input) {
			return input ? '\u2713' : '\u2718';
		};
	});
})(angular);
