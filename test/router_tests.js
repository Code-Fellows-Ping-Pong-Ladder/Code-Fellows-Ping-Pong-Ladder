'use strict';

const chai = require('chai');
const chaiHTTP = require('chai-http');
chai.use(chaiHTTP);
const expect = chai.expect;
const request = chai.request;
const mongoose = require('mongoose');
const dbPort = process.env.MONGOLAB_URI;

process.env.MONGOLAB_URI = 'mongodb://localhost/test_db';
require('../api_server.js');

describe('testing CRUD routes for auth', () => {
  before((done) => {
    request('/')
    .post('/auth/signup')
    .send({username: 'saveduser', password:'password'})
    .end((err) => {
      if (err) console.log('error message');
      done();
    });
  });
  after((done) => {
    process.env.MONGOLAB_URI = dbPort;
    mongoose.connection.db.dropDatabase(() => {
      done();
    });
  });
  it('should be able to signup', (done) => {
    request('/')
      .post('/auth/signup')
      .send({username: 'testuser', password: 'testpassword'})
      .end((err, res) => {
        expect(err).to.eql(null);
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('token');
        done();
      });
  });
  it('should be able to signin', (done) => {
    request('/')
    .get('/auth/signin')
    .auth('saveduser', 'password')
    .end((err, res) => {
      expect(err).to.eql(null);
      expect(res).to.have.status(200);
      expect(res.body).to.have.property('token');
      done();
    });
  });
});
