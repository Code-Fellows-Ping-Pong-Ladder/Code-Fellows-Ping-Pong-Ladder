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
  });
});
