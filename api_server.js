'use strict';
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const authRouter = require('./routes/auth_routes');
const userRouter = require('./routes/user_routes');
const logRouter = require('./routes/log_routes');

const dbPort = process.env.MONGOLAB_URI || 'mongodb://localhost/dev_db';

mongoose.connect(dbPort);

app.use(express.static(__dirname + '/build'));

app.use('/auth', authRouter);
app.use('/users', userRouter);
app.use('/log', logRouter);

app.use((req, res) => {
  console.log('hit end');
  res.status(404).json({message: 'route not found'});
}).use((err, req, res, next) => {
  res.status(500).json({message: err.message});
  next(err);
});

app.listen(3000, () => {
  console.log('listening on 3000, foo');
});
