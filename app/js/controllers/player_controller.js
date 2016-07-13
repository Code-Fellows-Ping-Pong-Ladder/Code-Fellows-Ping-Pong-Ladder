module.exports = function(app) {
  app.controller('PlayerController', function($scope, playerServices, player) {
    $scope.player = player;
  });
};
