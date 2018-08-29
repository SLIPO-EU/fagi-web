var mirrorToPath = require('../helpers/path-mirror.js');

var types = mirrorToPath({
  
  SET_DATASET_ACTION: null,
  REQUEST_FUSE: null,
  RESPONSE_FUSE: null,
  REQUEST_DOWNLOAD: null,
  RESPONSE_DOWNLOAD: null,
  REQUEST_RUN_STATISTICS: null,
  RECEIVED_STATISTICS: null

});

module.exports = types;