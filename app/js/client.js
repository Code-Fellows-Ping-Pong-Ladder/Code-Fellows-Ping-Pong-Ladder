'use strict';

const angular = require('angular');
const ngRoute = require('angular-route');

const app = angular.module('Pong-App', [ngRoute]);

require('./services')(app);
require('./controllers')(app);
require('./directives')(app);

app.config(function($routeProvider) {
  $routeProvider.when('/signin', {
    templateUrl: './templates/partials/signin.html',
    controller: 'AuthController',
    controllerAs: 'authctrl'
  })
  .when('/', {
    templateUrl: './templates/partials/ladder.html',
    controller: 'UserController',
    controllerAs: 'userctrl'
  })
  .when('/signup', {
    templateUrl: './templates/signup_directive.html',
    controller: 'AuthController',
    controllerAs: 'authctrl'
  })
  .when('/edit', {
    templateUrl: './templates/edit_directive.html',
    controller: 'AuthController',
    controllerAs: 'authctrl'
  })
  .when('/profile/:id', {
    templateUrl: './templates/partials/profile_view.html',
    controller: 'PlayerController',
    resolve: {
      player: function($route, $http) {
        let id = $route.current.params.id;
        let profileData = $http.get('http://localhost:3000/users/' + id)
        .then((res) => {
          let player = res.data.user;
          return player;
        });
        return profileData;
      }
    }
  });
});
