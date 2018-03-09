var mirrorToPath = require('../helpers/path-mirror.js');

var types = mirrorToPath({
  
  SET_DATASET_ACTION: null,
  FUSE: null,
  REQUEST_RUN_STATISTICS: null,
  RECEIVED_STATISTICS: null

});

module.exports = types;