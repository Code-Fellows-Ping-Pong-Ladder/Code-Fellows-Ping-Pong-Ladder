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
  .when('/profile/:id', {
    templateUrl: './templates/partials/profile_view.html',
    controller: 'PlayerController',
    resolve: {
      player: function($route, $http) {
        var id = $route.current.params.id;
        // var player = playerServices.getPlayer(id);
        // return player;
        $http.get('http://localhost:3000/users/' + id)
        .then((res) => {
          var goose = res.data.user;
          console.log(goose);
          return goose;
        });
        // return {
        //   username: 'vic',
        //   wins: 3,
        //   losses: 4
        // }
      }
    }
  });
});
