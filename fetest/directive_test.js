'use strict';

const angular = require('angular');
require('angular-mocks');
require('../app/js/client');

const challenge = require('../app/templates/challenge_directive.html');
const log = require('../app/templates/logs.html');
const ladder = require('../app/templates/ladder_directive.html');
const signIn = require('../app/templates/signin_directive.html');

describe('directive tests', () => {
  let $httpBackend;
  let $scope;
  let $compile;

  beforeEach(() => {
    angular.mock.module('Pong-App');
    angular.mock.inject(function(_$httpBackend_, $rootScope, _$compile_) {
      $scope = $rootScope.$new();
      $compile = _$compile_;
      $httpBackend = _$httpBackend_;
    });
  });

  it('should have the challenger username and call finish challenge function', () => {
    $httpBackend.expectGET('./templates/challenge_directive.html')
    .respond(200, challenge);

    $scope.challenger = {
      username: 'test',
      _id: 'test',
      rank: 2,
      madeChallenge: true,
      user: {
        _id: 'othertest',
        username: 'test2',
        hasChallenge: true
      }
    };

    let element = angular.element('<challenge-directive challenger="user.user.hasChallenge"></challenge-directive>');
    element.data('$ngControllerController', {});
    let link = $compile(element);
    let directive = link($scope);
    $scope.$digest();
    $httpBackend.flush();

    let h2 = directive.find('h2');
    let h2text = h2.text();
    let button = directive.find('button');
    let buttonattr = button.attr('ng-click');
    let buttontext = button.text();

    expect(h2text).toBe('You Have a Challenge');
    expect(buttonattr).toBe('finishMatch(challenger, false)');
    expect(buttontext).toBe('I WonI Lost');
  });

  it('should list logs', () => {
    $httpBackend.expectGET('./templates/logs.html')
    .respond(200, log);

    $scope.logs = [{
      winner: 'testuser1',
      winnerRank: 3,
      loser: 'testuser2',
      loserRank: 5,
      time: 'testtime'
    }, {
      winner: 'testuser3',
      winnerRank: 1,
      loser: 'testuser4',
      loserRank: 2,
      time: 'testtime2'
    }];

    let element = angular.element('<div ng-controller="LogController as logctrl"><log-directive logs="logs"></log-directive></div');
    let link = $compile(element);
    let directive = link($scope);
    $scope.$digest();
    $httpBackend.flush();

    let list = directive.find('li');

    expect(list.length).toBe(2);
  });

  it('should test the ladder directive', () => {
    $httpBackend.expectGET('./templates/ladder_directive.html')
    .respond(200, ladder);

    $scope.player = {
      rank: 2,
      username: 'test'
    };

    let element = angular.element('<ladder-directive ladder="player"></ladder-directive>');
    element.data('$ngControllerController', {});
    let link = $compile(element);
    let directive = link($scope);
    $scope.$digest();
    $httpBackend.flush();

    let button = directive.find('button');
    let buttonattr = button.attr('ng-click');

    expect(buttonattr).toBe('goToProfile(player)');
  });

  it('should test the signin directive', () => {
    $httpBackend.expectGET('./templates/signin_directive.html')
    .respond(200, signIn);

    let element = angular.element('<signin-directive></signin-directive>');
    let link = $compile(element);
    let directive = link($scope);
    $scope.$digest();
    $httpBackend.flush();

    let h1 = directive.find('h1');
    let h1text = h1.text();
    let button = directive.find('button');
    let buttontext = button.text();

    expect(h1text).toBe('Welcome to Pong Fellows');
    expect(buttontext).toBe('Sign inJoin!');
  });
});
