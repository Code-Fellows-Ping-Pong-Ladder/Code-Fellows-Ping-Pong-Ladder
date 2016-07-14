'use strict';

module.exports = function(app) {
  app.controller('UserController', ['$http', '$location', '$window', 'ErrorHandler', 'AuthService', 'NavigationService', UserController]);
};

function UserController($http, $location, $window, ErrorHandler, AuthService, NavigationService) {
  this.$http = $http;
  this.ladder = [];
  this.user;
  this.selectedPlayer = {};
  this.loggedInUser = AuthService.getCurrentUserNoJSON();
  // console.log('id', playerID && playerID.id );

  const url = '/users/';

  this.getLadder = function() {
    let currentUser = AuthService.getCurrentUserNoJSON();
    $http.get(url)
    .then((res) => {
      let users = res.data;
      this.ladder = users.sort(function(a,b) {
        return a.rank - b.rank;
      }).map((user) => {
        if (user.rank + 2 >= currentUser.rank && user.rank !== currentUser.rank) {
          user.canChallenge = true;
        }
        return user;
      });
    }, ErrorHandler.logError('Error getting users'));
  };

  this.getUser = function(user) {
    if (!user._id) user = JSON.parse(user);
    $http.get(url + user._id)
    .then((res) => {
      this.user = res.data;
      console.log('MADE IT HERE', this.user)
    }, ErrorHandler.logError('Error getting user'));
  }.bind(this);

  this.challenge = function(user) {
    user.hasChallenge = AuthService.getCurrentUserNoJSON();
    $http.put('/users/challenge', user)
    .then(() =>{

    }, ErrorHandler.logError(`Error adding challenge to ${user.username}.`));
  };

  this.finishMatch = function(challenger, upset) {
    let user = this.loggedInUser;
    this.user.user.hasChallenge = null;
    user.hasChallenge = null;
    let winner;
    let loser;
    let challengerRank = challenger.rank;
    let userRank = user.rank;
    let log = {
      time: new Date().toString()
    };
    if (!upset && userRank > challengerRank) {
      winner = user;
      loser = challenger;
      log.winnerRank = userRank;
      log.loserRank = challengerRank;
      challenger.rank = userRank;
      user.rank = challengerRank;
    } else if (!upset && userRank < challengerRank) {
      winner = user;
      loser = challenger;
      log.winnerRank = winner.rank;
      log.loserRank = loser.rank;
    } else if (upset && userRank > challengerRank) {
      winner = challenger;
      loser = user;
      log.winnerRank = winner.rank;
      log.loserRank = loser.rank;
    } else if (upset && userRank < challengerRank) {
      winner = challenger;
      loser = user;
      log.winnerRank = challenger.rank;
      log.loserRank = user.rank;
      challenger.rank = userRank;
      user.rank = challengerRank;
    }
    log.winner = winner.username;
    log.loser = loser.username;
    $window.localStorage.currentUser = JSON.stringify(user);
    $http({
      method: 'PUT',
      data: user,
      headers: {
        token: AuthService.getToken()
      },
      url: url
    })
    .then(
      $http({
        method: 'PUT',
        url: url + '/challenge',
        data: challenger
      })
    )
    .then(
      $http({
        method: 'POST',
        url: '/log',
        data: log
      })
    );
  }.bind(this);

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

  this.goToProfile = function(player) {
    this.selectedPlayer = player;
    NavigationService.goToProfile(player);

  }.bind(this);
}
