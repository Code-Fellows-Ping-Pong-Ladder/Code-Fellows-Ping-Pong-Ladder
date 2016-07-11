'use strict';

const chai = require('chai');
const chaiHTTP = require('chai-http');
chai.use(chaiHTTP);
const expect = chai.expect;
const request = chai.request;
const mongoose = require('mongoose');
const dbPort = process.env.MONGOLAB_URI;
let testToken = '';

process.env.MONGOLAB_URI = 'mongodb://localhost/test_db';
require('../api_server.js');

describe('testing CRUD routes for auth', () => {
  after((done) => {
    process.env.MONGOLAB_URI = dbPort;
    mongoose.connection.db.dropDatabase(() => {
      done();
    });
  });
  it('should be able to signup', (done) => {
    request('localhost:3000')
      .post('/auth/signup')
      .send({username: 'testuser', password: 'testpassword'})
      .end((err, res) => {
        expect(err).to.eql(null);
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('token');
        done();
      });
  });
});
