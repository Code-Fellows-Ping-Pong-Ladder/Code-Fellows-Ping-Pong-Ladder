'use strict';

module.exports = function(app) {
  require('./user_controller')(app);
  require('./auth_controller')(app);
};
