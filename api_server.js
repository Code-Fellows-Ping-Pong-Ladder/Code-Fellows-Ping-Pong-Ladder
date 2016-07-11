'use strict';
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const authRouter = require('./routes/auth_routes');
const devRouter = require('./routes/dev_routes');

const dbPort = process.env.MONGOLAB_URI || 'mongodb://localhost/dev_db';

mongoose.connect(dbPort);

app.use(cors());

app.use('/auth', authRouter);
app.use('/dev', devRouter);

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
