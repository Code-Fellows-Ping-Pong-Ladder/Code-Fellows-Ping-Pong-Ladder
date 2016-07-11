'use strict';

const mongoose = require('mongoose');

const Log = new mongoose.Schema({
  winner: String,
  loser: String,
  winnerRank: Number,
  loserRank: Number,
  time: Date
});

module.exports = mongoose.model('log', Log);
