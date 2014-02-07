'use strict';

/* App Module */

var tictactoeApp = angular.module('tictactoeApp', [
  'ngRoute',
  'tictactoeControllers',
  'tictactoeFilters',
  'tictactoeServices'
]);

tictactoeApp.config(['$routeProvider', '$httpProvider',
  function($routeProvider, $httpProvider) {
    $routeProvider.
      when('/register', {
        templateUrl: 'partials/register.html',
        controller: 'RegisterCtrl'
      }).
      when('/rooms/:oid', {
        templateUrl: 'partials/rooms.html',
        controller: 'RoomsListCtrl'
      }).
      when('/play', {
        templateUrl: 'partials/play.html',
        controller: 'PlayCtrl'
      }).
      otherwise({
        redirectTo: '/register',
      });
    
   // $httpProvider.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded";
}]);


