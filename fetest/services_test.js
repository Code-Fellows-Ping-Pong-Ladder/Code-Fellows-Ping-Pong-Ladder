'use strict';
const angular = require('angular');
require('angular-mocks');
require('../app/js/client');

describe('error service tests', function() {
  let errorService;
  beforeEach(() => {
    angular.mock.module('Pong-App');
    angular.mock.inject(function(ErrorHandler) {
      errorService = ErrorHandler;
    });
  });
  it('should have a getter', () => {
    expect(typeof errorService.getErrors).toBe('function');
  });

  it('should get an array', () => {
    expect(Array.isArray(errorService.getErrors())).toBe(true);
  });

  it('should add an error to the log', () => {
    errorService.logError('test error')({});
    let errorArray = errorService.getErrors();
    expect(errorArray[0]).toBe('test error');
  });
});
/*---------------------------------------------------------------------*/
describe('auth service tests', function() {
  let authService;
  beforeEach(() => {
    angular.mock.module('Pong-App');
    angular.mock.inject(function(AuthService) {
      authService = AuthService;
    });
  });
  it('should have 7 functions', () => {
    expect(typeof authService.signup).toBe('function');
    expect(typeof authService.signIn).toBe('function');
    expect(typeof authService.updateProfile).toBe('function');
    expect(typeof authService.signOut).toBe('function');
    expect(typeof authService.getToken).toBe('function');
    expect(typeof authService.getCurrentUser).toBe('function');
    expect(typeof authService.getCurrentUserNoJSON).toBe('function');
  });

  it('should return an object', () => {
    expect(typeof authService.getCurrentUser()).toBe('object');
  });
});
/*---------------------------------------------------------------------*/
describe('navigation service tests', function() {
  let navigationService;
  beforeEach(() => {
    angular.mock.module('Pong-App');
    angular.mock.inject(function(NavigationService) {
      navigationService = NavigationService;
    });
  });
  it('should have 5 functions', () => {
    console.log(navigationService.goToLadder());
    expect(typeof navigationService.goToLadder).toBe('function');
    expect(typeof navigationService.goToProfile).toBe('function');
    expect(typeof navigationService.goToEdit).toBe('function');
    expect(typeof navigationService.goToSignin).toBe('function');
    expect(typeof navigationService.goToSignup).toBe('function');
  });
});
/*---------------------------------------------------------------------*/
describe('stats service tests', function() {
  let statsService;
  let oldUserToLose = {
    wins: 1,
    losses: 5,
    wStreak: 1,
    lStreak: 0,
    longestWStreak: 1,
    longestLStreak: 2
  };
  let oldUserToWin = {
    wins: 1,
    losses: 5,
    wStreak: 1,
    lStreak: 0,
    longestWStreak: 1,
    longestLStreak: 2
  };
  let newUserToLose = {
    wins: 0,
    losses: 0,
    wStreak: 0,
    lStreak: 0,
    longestWStreak: 0,
    longestLStreak: 0
  };
  let newUserToWin = {
    wins: 0,
    losses: 0,
    wStreak: 0,
    lStreak: 0,
    longestWStreak: 0,
    longestLStreak: 0
  };
  beforeEach(() => {
    angular.mock.module('Pong-App');
    angular.mock.inject(function(StatsService) {
      statsService = StatsService;
    });




  });

  it('should update old user after win', () => {
    statsService.updateWinnerStats(oldUserToWin);
    expect(oldUserToWin.wins).toBe(2);
    expect(oldUserToWin.wStreak).toBe(2);
    expect(oldUserToWin.lStreak).toBe(0);
    expect(oldUserToWin.longestWStreak).toBe(2);
  });

  it('should update old user after loss', () => {
    statsService.updateLoserStats(oldUserToLose);
    expect(oldUserToLose.losses).toBe(6);
    expect(oldUserToLose.lStreak).toBe(1);
    expect(oldUserToLose.wStreak).toBe(0);
    expect(oldUserToLose.longestLStreak).toBe(2);
  });

  it('should update new user after win', () => {
    statsService.updateWinnerStats(newUserToWin);
    expect(newUserToWin.wins).toBe(1);
    expect(newUserToWin.wStreak).toBe(1);
    expect(newUserToWin.lStreak).toBe(0);
    expect(newUserToWin.longestWStreak).toBe(1);
  });

  it('should update new user after loss', () => {
    statsService.updateLoserStats(newUserToLose);
    expect(newUserToLose.losses).toBe(1);
    expect(newUserToLose.lStreak).toBe(1);
    expect(newUserToLose.wStreak).toBe(0);
    expect(newUserToLose.longestLStreak).toBe(1);
  });
});
