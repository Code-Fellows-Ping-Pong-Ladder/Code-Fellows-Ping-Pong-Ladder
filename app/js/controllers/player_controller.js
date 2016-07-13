module.exports = function(app) {
  app.controller('PlayerController', ['$scope', 'player', function ($scope, player) {
    $scope.player = player;
  }]);
};
