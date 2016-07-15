const angular = require('angular');
require('angular-mocks');
require('../app/js/client.js');

describe('controller tests', () => {
  let $httpBackend;
  let authctrl;
  let logctrl;
  let plyrctrl;
  let usrctrl;
  beforeEach(()=> {
    angular.mock.module('Pong-App');
    angular.mock.inject(function($controller, _$httpBackend_) {
      authctrl = new $controller('AuthController');
      logctrl = new $controller('LogController');
      $httpBackend = _$httpBackend_;
    });
  });
  afterEach(() => {
    $httpBackend.verifyNoOutstandingRequest();
    $httpBackend.verifyNoOutstandingExpectation();
  });
  it('log controller should get logs', () => {
    let testResponse = [{
      winner: 'testWinner',
      loser: 'testLoser',
      winnerRank: 1,
      loserRank: 2,
      time: new Date().toString()
    }];
    $httpBackend.expectGET('/log')
      .respond(200, testResponse);
    logctrl.getLogs();
    $httpBackend.flush();
    expect(logctrl.logs[0].winner).toBe('testWinner');
  });
  it('log controller should be able to toggleLogs', () => {
    logctrl.toggleLogs();
    expect(!logctrl.hideLogs).toBe(true);
  });
  it('signup should be a function on authctrl', () => {
    expect(typeof authctrl.signup).toBe('function');
  })
});
