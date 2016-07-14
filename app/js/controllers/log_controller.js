'use strict';

module.exports = function(app){
  app.controller('LogController', ['$http', 'ErrorHandler', LogController]);
};

function LogController($http, ErrorHandler) {
  this.$http = $http;
  this.logs = [{
    winner: 'testWinner',
    loser: 'testLoser',
    winnerRank: 1,
    loserRank: 2
  }];
  this.hideLogs = true;

  this.toggleLogs = function() {
    console.log('TOGGLING HIDE', this.hideLogs);
    // if (this.hideLogs = true) {
    //   console.log('TOGGLED HIDE TO FALSE');
    //   this.hideLogs = false;
    // } else if (this.hideLogs = false) {
    //   console.log('TOGGLED HIDE TO TRUE');
    //   this.hideLogs = true;
    // }
    this.hideLogs = !this.hideLogs;
  }.bind(this);

  this.getLogs = function() {

    $http.get('/log')
    .then((res) => {
      let returnedLogs = res.data;
      this.logs = returnedLogs.sort(function(a, b) {
        return new Date(b.time) - new Date(a.time);
      });
    }, ErrorHandler.logError('Error getting logs'));
  };

  this.postLog = function(user, challenger, unseat) {
    let winner;
    let loser;
    let upset;
    let t = new Date();
    if (!unseat) {
      winner = user;
      loser = challenger;
      upset = false;
    } else {
      winner = challenger;
      loser = user;
      upset = true;
    }
    let newLog = {
      winner: winner.username,
      loser: loser.username,
      time: t.toLocaleTimeString() + ' on ' + t.toDateString(),
      winnerRank: winner.rank,
      loserRank: loser.rank,
      upset: upset

    };
    $http.post('/log')
      .send(newLog)
      .then(() => {
        this.getLogs();
      }), ErrorHandler.logError('error posting log');
  };
}
