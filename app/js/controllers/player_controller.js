'use strict';

module.exports = function(app) {
  app.controller('PlayerController', ['$scope', '$location', 'player', 'NavigationService', 'AuthService', PlayerController]);
};

function PlayerController($scope, $location, player, NavigationService, AuthService) {
  $scope.player = player;
  $scope.goToEdit = NavigationService.goToEdit;
  $scope.myProfile = AuthService.getCurrentUserNoJSON()._id === $location.url().split('/').pop() ? true : false;
}
