'use strict';

const angular = require('angular');
const ngRoute = require('angular-route');

const app = angular.module('Pong-App', [ngRoute]);

require('./services')(app);
require('./controllers')(app);
require('./directives')(app);

app.config(function($routeProvider) {
  $routeProvider.when('/', {
    templateUrl: './templates/partials/home.html',
    controller: 'AuthController',
    controllerAs: 'authctrl'
  })
  .when('/ladder', {
    templateUrl: './templates/partials/ladder.html',
    controller: 'UserController',
    controllerAs: 'userctrl'
  })
  .when('/signup', {
    templateUrl: './templates/signup_directive.html',
    controller: 'AuthController',
    controllerAs: 'authctrl'
  })
  .when('/profile', {
    templateUrl: './templates/partials/profile.html',
    controller: 'UserController',
    controllerAs: 'userctrl'
    // resolve: {
    //   playerID: function($route) {
    //     var id = $route.current.params.id;
    //     return id;
    //   }
    // }
  });
});
