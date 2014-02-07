'use strict';

/* Filters */

angular.module('tictactoeFilters', []).filter('checkmark', function() {
  return function(input) {
    return input ? '\u2713' : '\u2718';
  };
});
