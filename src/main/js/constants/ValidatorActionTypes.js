var mirrorToPath = require('../helpers/path-mirror.js');

var types = mirrorToPath({

  ADD_VALIDATION_RULE: null,
  REMOVE_VALIDATION_RULE: null,
  SET_DEFAULT_VALIDATION_ACTION: null,
  SELECT_VALIDATION_ACTION: null,
  UPDATE_VALIDATION_ACTION_RULE: null

});

module.exports = types;