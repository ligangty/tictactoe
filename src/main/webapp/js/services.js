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
						var BLOCK_IMAGE = {
								image: "/tictactoe/images/block.gif",
								type:1
						},
						CIRCLE_IMAGE = {
								image: "/tictactoe/images/circle.gif", 
								type:2
						}, 
						WINNING_RULESET = [
								[ 0, 1, 2 ], [ 3, 4, 5 ], [ 6, 7, 8 ],
								[ 0, 3, 6 ], [ 1, 4, 7 ], [ 2, 5, 8 ],
								[ 0, 4, 8 ], [ 2, 4, 6 ] 
						];
						var ticMatrix = [ {
							type : 0,
							clicked : false
						}, {
							type : 0,
							clicked : false
						}, {
							type : 0,
							clicked : false
						}, {
							type : 0,
							clicked : false
						}, {
							type : 0,
							clicked : false
						}, {
							type : 0,
							clicked : false
						}, {
							type : 0,
							clicked : false
						}, {
							type : 0,
							clicked : false
						}, {
							type : 0,
							clicked : false
						} ];
						var currentImageType = 'init';

						var changeImgType = function() {
							if (currentImageType === "block") {
								currentImageType = "circle";
								return CIRCLE_IMAGE;
							} else {
								currentImageType = "block";
								return BLOCK_IMAGE;
							}
						};
						
						var setPlayerAct = function(clickedDivIndex){
							if(ticMatrix[clickedDivIndex].clicked===true){
								return {needChange: false};
							}else{
								var changedImage = changeImgType();
								ticMatrix[clickedDivIndex].type=changedImage.type;
								ticMatrix[clickedDivIndex].clicked=true;
								return {
									image : changedImage,
									needChange:true
								};
							}
						};

						var decideWinning = function() {
							for(var index=0;index<WINNING_RULESET.length;index++){
								var winRule=WINNING_RULESET[index];
								if((ticMatrix[winRule[0]].type!==0)
										&&(ticMatrix[winRule[0]].type===ticMatrix[winRule[1]].type)
										&&(ticMatrix[winRule[0]].type===ticMatrix[winRule[2]].type)){
									return {
										isWin:true,
										winner:ticMatrix[winRule[0]].type
									};
								}
							}
							return {
								isWin:false
							};
						};

						return {
							setPlayerAction : setPlayerAct,
							changeImageType : changeImgType,
							decideWinner : decideWinning
						};
					});

})(angular);