'use strict';

module.exports = function(app){
  app.controller('LogController', ['$http', 'ErrorHandler', LogController]);
};

function LogController($http, ErrorHandler) {
  this.$http = $http;
  this.log = [];

  this.getLog = function() {
    $http.get('localhost:3000/log')
    .then((res) => {
      let returnedLogs = res.data;
      this.log = returnedLogs.sort(function(a, b) {
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
      date: new Date(),
      winnerRank: winner.rank,
      loserRank: loser.rank,
      upset: upset

    }
    $http.post('localhost:3000/log')
      .send(newLog)
      .then((res) => {
        this.getLog();
      }), ErrorHandler.logError('error posting log');
  };
};
