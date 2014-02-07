'use strict';

/* Services */

var tictactoeServices = angular.module('tictactoeServices', ['ngResource']);

tictactoeServices.factory('User', ['$resource',
  function($resource){
  	return $resource("/tictactoe/api/user");
  }]);

tictactoeServices.factory('Room', ['$resource',
   function($resource){
   	 return $resource("/tictactoe/api/room");
  }]);