'use strict';

module.exports = function(app) {
  require('./error_handler')(app);
  require('./auth_service')(app);
  require('./navigation_service')(app);
  require('./stats_service')(app);
};
