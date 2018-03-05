var mirrorToPath = require('../helpers/path-mirror.js');

var types = mirrorToPath({

  ADD_RULE : null,
  REMOVE_RULE : null,
  SET_RULE_ID : null,
  SET_FUSION_PROPERTY_A : null,
  SET_FUSION_PROPERTY_B : null  

});

module.exports = types;