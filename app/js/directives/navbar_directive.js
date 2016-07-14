'use strict';

module.exports = function(app) {
  app.directive('navbarDirective', ['AuthService', 'NavigationService', function(AuthService, NavigationService) {
    return {
      templateUrl: './templates/navbar_directive.html',
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
