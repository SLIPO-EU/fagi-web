var mirrorToPath = require('../helpers/path-mirror.js');

var types = mirrorToPath({

  ADD_RULE: null,
  REMOVE_RULE: null,
  SET_RULE_ID: null,
  SET_DEFAULT_RULE_ACTION: null,
  CHANGE_FUSION_ACTION: null,
  SET_FUSION_PROPERTY_A: null,
  SET_FUSION_PROPERTY_B: null,
  ADD_ACTION_RULE: null,
  REMOVE_ACTION_RULE: null,
  UPDATE_ACTION_RULE: null

});

module.exports = types;