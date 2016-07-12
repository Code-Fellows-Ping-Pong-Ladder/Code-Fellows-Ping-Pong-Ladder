'use strict';

module.exports = function(app) {
  app.directive('signinDirective', function() {
    return {
      templateUrl: './templates/signin_directive.html'
    };
  });
};
