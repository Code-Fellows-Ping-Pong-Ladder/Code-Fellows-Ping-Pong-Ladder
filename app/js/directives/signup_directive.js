'use strict';

module.exports = function(app) {
  app.directive('signupDirective', function() {
    return {
      templateUrl: './templates/signup_directive.html'
    };
  });
};
