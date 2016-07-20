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

router.get('/:id', (req, res, next) => {
  let _id = req.params.id;
  let token = req.headers.token;

  //jwt.tokenCheck(token);
  User.findOne({_id}, (err, user) => {
    if (err) return next(err);
    res.json({user});
  });
});

router.put('/', bodyParser, jwt, (req, res, next) => {
  User.findOneAndUpdate({_id: req.body._id}, req.body, (err) => {
    if (err) return next(err);
    let message = 'successfully updated';
    res.json({message});
  });
});

router.put('/challenge', bodyParser, (req, res, next) => {
  User.findOneAndUpdate({_id: req.body._id}, req.body, (err) => {
    if (err) return next(err);
    let message = 'successfully updated';
    res.json({message});
  });
});

router.delete('/:id', jwt, (req, res, next) => {
  let _id = req.params.id;
  let token = req.headers.token;
  if (jwt.tokenCheck(token) === _id) {
    User.findOneAndRemove({_id}, (err) => {
      if(err) return next(err);
      let message = 'successfully deleted';
      res.json({message});
    });
  }
  res.json('No hacking allowed');
});
