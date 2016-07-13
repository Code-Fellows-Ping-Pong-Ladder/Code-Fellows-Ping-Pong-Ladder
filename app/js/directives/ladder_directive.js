'use strict';

module.exports = function(app) {
  app.directive('ladderDirective', function () {
    return {
      scope: {
        ladder: '='
      },
      templateUrl: './templates/ladder_directive.html',
      require: '^^ngController',
      link: function($scope, elem, attr, controller) {
        $scope.getLadder = controller.getLadder;
        $scope.goToProfile = controller.goToProfile;
      }
    };
  });
};
