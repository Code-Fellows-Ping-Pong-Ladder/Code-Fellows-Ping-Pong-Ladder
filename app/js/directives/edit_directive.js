'use strict';
//this directive doesn't seem to be being used anywhere
module.exports = function(app) {
  app.directive('editDirective', function() {
    return {
      templateUrl: './templates/edit_directive.html'
    };
  });
};
