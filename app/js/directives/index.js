'use strict';

module.exports = function(app) {
  require('./log_directive')(app);
  require('./profile_directive')(app);
  require('./ladder_directive')(app);
};
