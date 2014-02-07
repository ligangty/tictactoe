'use strict';

/* Controllers */

var tictactoeControllers = angular.module('tictactoeControllers', []);

tictactoeControllers.controller('RegisterCtrl', ['$scope', '$location','User',
  function($scope, $location, User) {
	$scope.createButtonLabel = "Create";
	$scope.user = new User();
	$scope.create = function(){
		$scope.user.$save(function(){
//			var resource = $scope.user;
//			console.log(resource.username);
			$scope.message = "";
			$location.path("/rooms/"+$scope.user.oid);
		},function(response){
			if(response.status==304){
				$scope.message = $scope.user.username+" has been registered, please try another username";
			}
		});
		
	};
  }]);


tictactoeControllers.controller('RoomsListCtrl', ['$scope','$routeParams','$location', 'User','Room',
  function($scope, $routeParams, $location, User, Room) {
    User.get({oid:$routeParams.oid}, function(data){
    	$scope.user = data;
    },function(response){
    	console.log(response);
    });
    Room.query(function(data){
    	$scope.rooms = data;
    });
    $scope.createRoom = function(){
    	$scope.room={};
    	$scope.room.creator = $scope.user;
    	Room.save($scope.room,function(){
    		$location.path("/rooms/"+$scope.user.oid);
    	});
    };
    
  }]);

/*
tictactoeControllers.controller('PlayCtrl', ['$scope', '$routeParams', 'Play',
  function($scope, $routeParams, Play) {
    
  }]);
*/