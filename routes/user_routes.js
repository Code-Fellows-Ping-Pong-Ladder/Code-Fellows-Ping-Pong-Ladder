'use strict';

const express = require('express');
const User = require('../model/user');
const bodyParser = require('body-parser').json();
const jwt = require('../lib/jwt_auth');

const router = module.exports = exports = express.Router();

router.get('/', (req, res, next) => {
  User.find({}, (err, users) => {
    if(err) return next(err);
    res.json(users);
  });
});

router.put('/', bodyParser, jwt, (req, res, next) => {
  User.findOneAndUpdate({_id: req.body._id}, req.body, (err) => {
    if (err) return next(err);
    let message = 'successfully updated';
    res.json({message});
  });
});
