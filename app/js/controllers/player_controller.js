// module.exports = function(app) {
//   app.controller('PlayerController', ['$scope', 'player', function ($scope, player) {
//     $scope.player = player;
//   }]);
// };


'use strict';

module.exports = function(app) {
  app.controller('PlayerController', ['$scope', '$location', 'player', 'NavigationService', 'AuthService', PlayerController]);
};

function PlayerController($scope, $location, player, NavigationService, AuthService) {
  $scope.player = player;
  //this.goHome = NavigationService.goHome;
  $scope.goToEdit = NavigationService.goToEdit;
  $scope.myProfile = AuthService.getCurrentUser()._id === $location.url().split('/').pop() ? true : false;
}
