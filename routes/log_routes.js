'use strict';

const express = require('express');
const Log = require('../model/log');
const bodyParser = require('body-parser').json();

const router = module.exports = exports = express.Router();

router.get('/', (req, res, next) => {
  Log.find({}, (err, logs) => {
    if(err) return next(err);
    res.json(logs);
  });
});

router.post('/', bodyParser, (req, res, next) => {
  let freshLog = new Log(req.body);
  freshLog.save((err, log) => {
    if(err) return next(err);
    res.json(log);
  });
});
