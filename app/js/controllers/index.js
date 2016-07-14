'use strict';

module.exports = function(app) {
  require('./user_controller')(app);
  require('./auth_controller')(app);
  require('./log_controller')(app);
  require('./player_controller')(app);
};
