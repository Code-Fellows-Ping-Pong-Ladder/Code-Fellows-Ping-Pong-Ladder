'use strict';

const mongoose = require('mongoose');

const Log = new mongoose.Schema({
  winner: String,
  loser: String,
  winnerRank: Number,
  loserRank: Number,
  upset: Boolean,
  time: String
});

module.exports = mongoose.model('log', Log);
