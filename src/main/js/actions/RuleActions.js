var types = require('../constants/RuleActionTypes');

var RuleActions = {
  setFusionPropertyA : function(propertyA) {
    return {
      type : types.SET_FUSION_PROPERTY_A,
      fusionPropertyA : propertyA
    };
  },
  setFusionPropertyB : function(propertyB) {
    return {
      type : types.SET_FUSION_PROPERTY_B,
      fusionPropertyB : propertyB
    };
  }  
};
  
module.exports = RuleActions;