'use strict';

module.exports = function(app) {
  app.factory('AuthService', function($http, $window) {
    let token = $window.localStorage.token;
    let currentUser = $window.localStorage.currentUser || null;
    const service = {};

    service.signup = function(user) {
      return $http.post('http://localhost:3000/auth/signup', user)
      .then((res) => {
        console.log(res.data);
        token = res.data.token;
        currentUser = res.data.currentUser;
        $window.localStorage.token = token;
        $window.localStorage.currentUser = JSON.stringify(currentUser);
        return res;
      });
    };

    service.signIn = function(user) {
      let base64Auth = btoa(user.username + ':' + user.password);
      let authStr = 'Basic ' + base64Auth;

      return $http({
        method: 'GET',
        url: 'http://localhost:3000/auth/signin',
        headers: {
          authorization: authStr
        }
      }).then((res) => {
        token = res.data.token;
        currentUser = res.data.currentUser;
        $window.localStorage.token = token;
        $window.localStorage.currentUser = JSON.stringify(currentUser);
        return res;
      });
    };

    service.updateProfile = function(player) {
      currentUser.quote = player.quote != null ? player.quote : currentUser.quote;
      currentUser.image = player.image != null ? player.image : currentUser.image;
      return $http({
        method: 'PUT',
        url: 'http://localhost:3000/users',
        data: currentUser,
        headers: {
          token: token
        }
      }).then((res) => {
        currentUser = $window.localStorage.currentUser = JSON.stringify(currentUser);
        return res;
      });
    };

    service.signOut = function() {
      token = $window.localStorage.token = null;
      currentUser = $window.localStorage.currentUser = null;
    };

    service.getToken = function() {
      return token;
    };

    service.getCurrentUser = function() {
      return JSON.parse(currentUser);
    };

    service.getCurrentUserNoJSON = function() {
      return currentUser;
    };

    return service;
  });
};
