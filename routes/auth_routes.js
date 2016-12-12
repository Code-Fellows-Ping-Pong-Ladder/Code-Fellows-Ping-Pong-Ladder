'use strict';

const express = require('express');
const bodyParser = require('body-parser').json();
const User = require('../model/user');
const basicHTTP = require('../lib/basic_http');

const router = module.exports = exports = express.Router();

router.post('/signup', bodyParser, (req, res, next) => {
  let freshUser = new User(req.body);
  let hashedPassword = freshUser.hashPassword();
  freshUser.password = hashedPassword;
  req.body.password = null;
  User.findOne({username: req.body.username}, (err, user) => {
    if (err || user) return next(new Error('Error. Someone else may have this username already.'));
    User.find({}, (err, users) => {
      //probably best to take this out of final versions. This effectively logging out your users
      //it's a good idea to limit the amount of information that's available.
      console.log(users);
      if (err) return next(new Error('Could not rank player'));
      freshUser.rank = users.length + 1;

      freshUser.save((err, user) => {
        if (err) return next(new Error('Could not save user info. Please try again.'));
        let newToken = user.generateToken();
        res.json({currentUser: user, token: newToken});
      });
    });
  }).select('+password');
});

router.get('/signin', basicHTTP, (req, res, next) => {
  User.findOne({username: req.auth.username}, (err, user) => {
    if (err || !user) return next(new Error('Error logging in. Do you have an account?'));
    if (!user.comparePassword(req.auth.password)) return next(new Error('Sorry. Looks like your password was fucky.'));
    let newToken = user.generateToken();
    res.json({currentUser: user, token: newToken});
  }).select('+password');
});
