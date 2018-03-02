var types = require('../constants/RuleActionTypes');

var RuleActions = {
  setRuleId : function(id) {
    return {
      type : types.SET_RULE_ID,
      id : id
    };
  },  
  setFusionPropertyA : function(fusionPropertyA) {
    return {
      type : types.SET_FUSION_PROPERTY_A,
      fusionPropertyA : fusionPropertyA
    };
  },
  setFusionPropertyB : function(fusionPropertyB) {
    return {
      type : types.SET_FUSION_PROPERTY_B,
      fusionPropertyB : fusionPropertyB
    };
  }  
};
  
module.exports = RuleActions;