// module.exports = function(app) {
//   app.controller('PlayerController', ['$scope', 'player', function ($scope, player) {
//     $scope.player = player;
//   }]);
// };


'use strict';

module.exports = function(app) {
  app.controller('PlayerController', ['$scope', 'player', 'NavigationService', PlayerController]);
};

function PlayerController($scope, player, NavigationService) {
  $scope.player = player;
  this.goHome = NavigationService.goHome;
}
