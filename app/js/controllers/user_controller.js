'use strict';

module.exports = function(app) {
  app.controller('UserController', ['$http', '$location', 'ErrorHandler', 'AuthService', UserController]);
};

function UserController($http, $location, ErrorHandler, AuthService) {
  this.$http = $http;
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
    }, ErrorHandler.logError('Error getting users'));
  };

  this.getUser = function(user) {
    $http.get(url + user._id)
    .then((res) => {
      this.user = res.data;
    }, ErrorHandler.logError('Error getting user'));
  };

  this.deleteUser = function(user) {
    $http({
      method: 'DELETE',
      data: user,
      headers: {
        token: AuthService.getToken()
      },
      url: url + user._id
    })
    .then(() => {
      this.ladder.splice(this.ladder.indexOf(user), 1);
      for(var i = this.ladder.indexOf(user); i < this.ladder.length; i++) {
        if(this.ladder[i].rank > user.rank) {
          this.ladder[i].rank --;
          $http({
            method: 'PUT',
            data: this.ladder[i],
            headers: {
              token: AuthService.getToken()
            },
            url: url
          })
          .then((res) => {
            console.log(res);
          }, ErrorHandler.logError('Error updating database'));
        }
      }

    }, ErrorHandler.logError('Error deleting user'));
  }.bind(this);


}


// $http({
//   method: 'PUT',
//   data: this.ladder[i],
//   headers: {
//     token: AuthService.getToken()
//   },
//   url: url
// })
// .then(() => {
//   this.ladder = this.ladder.map((u) => {
//     return u._id === this.ladder[i] ?
//   })
// })
