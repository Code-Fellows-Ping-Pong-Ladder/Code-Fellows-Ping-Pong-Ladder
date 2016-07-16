'use strict';

const jwt = require('jsonwebtoken');
const User = require('../model/user');
const secret = process.env.SECRET || 'changeme';

module.exports = function(req, res, next) {
  let token = req.headers.token || req.body.token;
  let tokenErr = new Error('Authorization Failure, motherfucker!');
  let decodedToken;

  if (!token) return next(tokenErr);

  try {
    decodedToken = jwt.verify(token, secret);
  } catch(e) {
    return next('couldnt verify');
  }

  User.findOne({_id:decodedToken._id}, (err, user) => {
    if (!user || err) return next('user does not exist');
    req.user = user;
    next();
  });
};

module.exports.tokenCheck = function(token) {
  if (token) {
    let decodedToken = jwt.decode(token);
    console.log(decodedToken._id);
    return decodedToken._id;
  }
};
