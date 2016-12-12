'use strict';
//It looks like this directive might be being used in a view partial that you're not actually
//ever directing the user to.
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
