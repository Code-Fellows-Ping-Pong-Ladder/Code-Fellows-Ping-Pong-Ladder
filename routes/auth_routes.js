'use strict';

const express = require('express');
const bodyParser = require('body-parser').json();
const User = require('../model/user');
const basicHTTP = require('../lib/basic_http');
const jwt = require('jsonwebtoken');

const secret = process.env.SECRET || 'changeme';

const router = module.exports = exports = express.Router();

router.post('/signup', bodyParser, (req, res, next) => {
  let freshUser = new User(req.body);
  let hashedPassword = freshUser.hashPassword();
  freshUser.password = hashedPassword;
  req.body.password = null;
  User.findOne({username: req.body.username}, (err, user) => {
    if (err || user) return next(new Error('Error. Someone else may have this username already.'));
    freshUser.save((err, user) => {
      if (err) return next(new Error('Could not save user info. Please try again.'));
      let newToken = user.generateToken();
      try {
        let decodedToken = jwt.verify(newToken, secret);
      } catch(e) {
        return next('couldnt verify');
      }
      res.json({_id: user._id, token: newToken});
    });
  });
});

router.get('/signin', basicHTTP, (req, res, next) => {
  User.findOne({username: req.auth.username}, (err, user) => {
    if (err || !user) return next(new Error('Error logging in. Do you have an account?'));
    if (!user.comparePassword(req.auth.password)) return next(new Error('Sorry. Looks like your password was fucky.'));
    res.json({token: user.generateToken()});
  });
});
