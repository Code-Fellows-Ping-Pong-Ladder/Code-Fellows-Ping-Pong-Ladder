'use strict';

const chai = require('chai');
const chaiHTTP = require('chai-http');
chai.use(chaiHTTP);
const expect = chai.expect;
const request = chai.request;
const mongoose = require('mongoose');
const dbPort = process.env.MONGOLAB_URI;
let testToken = '';
let testId = '';

process.env.MONGOLAB_URI = 'mongodb://localhost/test_db';
require('../api_server.js');

describe('unit tests for user CRUD routes', () => {
  before((done) => {
    request('localhost:3000')
    .post('/auth/signup')
    .send({username: 'saveduser', password:'password'})
    .end((err, user) => {
      testToken = user.body.token;
      testId = user.body.currentUser._id;
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
  it('should get a list of users', (done) => {
    request('localhost:3000')
      .get('/users')
      .end((err, res) => {
        expect(err).to.eql(null);
        expect(res).to.have.status(200);
        expect(Array.isArray(res.body)).to.be.true;
        done();
      });
  });
  it('should be able to update a user', (done) => {
    request('localhost:3000')
      .put('/users/challenge')
      .send({_id: testId, hasChallenge: {username: 'testChallenger'}})
      .end((err, res) => {
        expect(err).to.eql(null);
        expect(res).to.have.status(200);
        done();
      });
  });
  it('should have updated', (done) => {
    request('localhost:3000')
      .get('/users')
      .end((err, res) => {
        expect(res.body[0].hasChallenge).to.eql({username: 'testChallenger'});
        done();
      });
  });
  it('should be able to delete a user', (done) => {
    request('localhost:3000')
      .delete('/users/' + testId)
      .set({token: testToken})
      .end((err, res) => {
        expect(err).to.eql(null);
        expect(res).to.have.status(200);
        done();
      });
  });
  it('should have deleted the user', (done) => {
    request('localhost:3000')
      .get('/users')
      .end((err, res) => {
        expect(res.body).to.eql([]);
        done();
      });
  });
});
