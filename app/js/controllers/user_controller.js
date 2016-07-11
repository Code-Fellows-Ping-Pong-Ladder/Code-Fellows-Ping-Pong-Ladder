'use strict';

module.exports = function(app) {
  app.controller('UserController', ['http', '$location', UserController]);
};

function UserController($http, $location) {
  const $http = $http;
  this.ladder = [];
  this.user;

  const url = 'http://localhost:3000/users/';

  this.getLadder = function() {
    $http.get(url)
    .then((res) => {
      let users = res.data;
      this.ladder = users.sort(function(a,b) {
        return a.rank - b.rank;
      });
    });
  };

  this.getUser = function(user) {
    $http.get(url + user._id)
    .then((res) => {
      this.user = res.data;
    });
  };
}
