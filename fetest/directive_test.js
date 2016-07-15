'use strict';

const angular = require('angular');
require('angular-mocks');
require('../app/js/client');

const challenge = require('../app/templates/challenge_directive.html');

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
      _id: 'test'
    };

    // $scope._id = 'test';
    // $scope.username = 'test';
    // $scope.hasChallenge = true;
    // console.log('challenge', challenge);
    // console.log('scope', $scope);

    let element = angular.element('<div ng-controller="UserController as userctrl" ng-init="userctrl.getUser(userctrl.loggedInUser)"><challenge-directive user="user.user"></challenge-directive></div>');
    element.data('$ngController', {});
    let link = $compile(element);
    let directive = link($scope);
    $scope.$digest();
    $httpBackend.flush();

    let h3 = directive.find('h3');
    let h3text = h3.text();

    expect(h3text).toBe('{{challenger.username}}');
  });
});
