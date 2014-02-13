(function(ng) {

	'use strict';

	/* App Module */

	var tictactoeApp = ng.module('tictactoeApp', [ 'ngRoute',
			'tictactoeControllers', 'tictactoeDirectives', 'tictactoeFilters',
			'tictactoeServices' ]);

	tictactoeApp.config([ '$routeProvider', '$httpProvider',
			function($routeProvider, $httpProvider) {
				$routeProvider.when('/register', {
					templateUrl : 'partials/register.html',
					controller : 'RegisterCtrl'
				}).when('/rooms/:oid', {
					templateUrl : 'partials/rooms.html',
					controller: 'RoomsListCtrl'
				}).when('/play/:roomId', {
					templateUrl : 'partials/play.html',
					controller : 'PlayCtrl'
				}).otherwise({
					redirectTo : '/register',
				});

				// $httpProvider.defaults.headers.post["Content-Type"] =
				// "application/x-www-form-urlencoded";
			} ]);
})(angular);
