'use strict';

module.exports = function(app) {
  app.directive('challengeDirective', function () {
    return {
      scope: {
        challenger: '='
      },
      templateUrl: './templates/challenge_directive.html',
      require: '^^ngController',
      link: function($scope, elem, attr, controller) {
        $scope.finishMatch = controller.finishMatch;
        $scope.getLadder = controller.getLadder;
      }
    };
  });
};
