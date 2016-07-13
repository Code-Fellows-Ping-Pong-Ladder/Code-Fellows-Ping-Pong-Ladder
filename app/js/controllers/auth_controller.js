'use strict';

module.exports = function(app) {
  app.controller('AuthController', ['$location', 'AuthService', 'NavigationService', AuthController]);
};

function AuthController($location, AuthService, NavigationService) {

  this.goToSignup = NavigationService.goToSignup;

  this.signup = function(user) {
    AuthService.signup(user)
       .then((res) => {
         console.log(res);
         NavigationService.goToLadder();
       })
       .catch((err) => {
         console.log(err);
       });
  };

  this.signIn = function(user) {
    AuthService.signIn(user)
       .then((res) => {
         console.log(res);
         NavigationService.goToLadder();
       })
       .then(null, (err) => {
         console.log(err);
         NavigationService.goToSignup();
       });
  };

  this.signOut = function() {
    AuthService.signOut()
       .then((res) => {
         console.log(res);
       })
       .catch((err) => {
         console.log(err);
       });
  };
}
