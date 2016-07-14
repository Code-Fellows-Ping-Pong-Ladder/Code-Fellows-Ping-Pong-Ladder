'use strict';

module.exports = function(app) {
  app.factory('StatsService', function() {
    const service = {};

    service.updateWinnerStats = function(winner) {
      winner.wins ++;
      winner.wStreak ++;
      winner.longestWStreak = winner.wStreak > winner.longestWStreak ? winner.wStreak : winner.longestWStreak;
      winner.lStreak = 0;
      return winner;
    };

    service.updateLoserStats = function(loser) {
      loser.losses ++;
      loser.lStreak ++;
      loser.longestLStreak = loser.lStreak > loser.longestLStreak ? loser.lStreak : loser.longestLStreak;
      loser.wStreak = 0;
      return loser;
    };

    return service;
  });
};
