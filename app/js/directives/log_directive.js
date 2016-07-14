module.exports = function(app) {
  app.directive('logDirective', function() {
    return {
      scope: {
        logs: '='
      },
      templateUrl: './templates/logs.html',
      require: '^^ngController',
      link: function($scope, elem, attr, controller) {
        $scope.getLogs = controller.getLogs;
      }
    };
  });
};
