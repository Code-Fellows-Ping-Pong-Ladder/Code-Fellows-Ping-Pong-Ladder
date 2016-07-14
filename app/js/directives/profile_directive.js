'use strict';

module.exports = function(app) {
  app.directive('profileDirective', function() {
    return {
      scope: {
        user: '='
      },
      templateUrl: './templates/profile_directive.html',
      require: '^^ngController',
      link: function($scope, elem, attr, controller) {
        $scope.getUser = controller.getUser;
      }
    };
  });
};
