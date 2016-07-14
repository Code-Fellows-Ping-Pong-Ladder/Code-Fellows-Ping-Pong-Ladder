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

describe('log router tests', () => {
  after((done) => {
    process.env.MONGOLAB_URI = dbPort;
    mongoose.connection.db.dropDatabase(() => {
      done();
    });
  });
  it('should be able to post a log', (done) => {
    request('/')
      .post('/log')
      .send({winner:"winTest",loser:"loseTest",winnerRank:2,loserRank:4,time: new Date()})
      .end((err, res) => {
        expect(res.body.winner).to.eql('winTest');
        expect(res.body.loser).to.eql('loseTest');
        expect(res.body.winnerRank).to.eql(2);
        expect(res.body.loserRank).to.eql(4);
        let newDate = new Date(res.body.time);
        expect(newDate.getFullYear()).to.eql(2016);
        done();
      });
  });
  it('should have a log that we can get', (done) => {
    request('/')
      .get('/log')
      .end((err, res) => {
        expect(res.body[0].winner).to.eql('winTest');
        expect(res.body[0].loser).to.eql('loseTest');
        expect(res.body[0].winnerRank).to.eql(2);
        expect(res.body[0].loserRank).to.eql(4);
        let newDate = new Date(res.body[0].time);
        expect(newDate.getFullYear()).to.eql(2016);
        done();
      });
  });
});
