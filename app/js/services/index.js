'use strict';

module.exports = function(app) {
  require('./error_handler')(app);
  require('./auth_service')(app);
};
