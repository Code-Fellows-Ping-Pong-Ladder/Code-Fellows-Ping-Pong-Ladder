const express = require('express');
const User = require('../model/user');

const router = module.exports = exports = express.Router();

router.get('/users', (req, res, next) => {
  User.find({}, (err, users) => {
    if(err) return next(err);
    res.json(users);
  });
});
