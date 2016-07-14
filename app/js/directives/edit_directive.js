'use strict';

module.exports = function(app) {
  app.directive('editDirective', function() {
    return {
      templateUrl: './templates/edit_directive.html'
    };
  });
};
