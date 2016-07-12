'use strict';

module.exports = function(app) {
  require('./user_controller')(app);
  //require('sign_in_controller')(app);
};
