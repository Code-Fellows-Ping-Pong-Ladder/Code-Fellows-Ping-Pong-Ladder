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
    loserRank: 2,
  }];

  this.getLogs = function() {

    $http.get('http://localhost:3000/log')
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
    if (!unseat) {
      winner = user;
      loser = challenger;
      upset = false;
    } else {
      winner = challenger;
      loser = user;
      upset = true;
    };
    let newLog = {
      winner: winner.username,
      loser: loser.username,
      time: new Date().toString(),
      winnerRank: winner.rank,
      loserRank: loser.rank,
      upset: upset

    }
    $http.post('http://localhost:3000/log')
      .send(newLog)
      .then((res) => {
        this.getLogs();
      }), ErrorHandler.logError('error posting log');
  };
};
