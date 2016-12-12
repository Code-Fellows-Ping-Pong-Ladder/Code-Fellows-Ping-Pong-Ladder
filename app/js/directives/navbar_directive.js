'use strict';

module.exports = function(app) {
  app.directive('navbarDirective', ['AuthService', 'NavigationService', function(AuthService, NavigationService) {
    return {
      templateUrl: './templates/navbar_directive.html',
      //If you're not using the link to actually link this directive to another directive or
      //controller I would use a controller for this. You could inject scope if you still want
      //to handle it that way or you could just use the controller in your directive template.
      link: function($scope) {
        $scope.goToLadder = NavigationService.goToLadder;
        $scope.goToProfile = function() {
          let player = AuthService.getCurrentUserNoJSON();
          NavigationService.goToProfile(player);
        };
        $scope.goToSignin = NavigationService.goToSignin;
        $scope.signOut = AuthService.signOut;
      }
    };
  }]);
};
