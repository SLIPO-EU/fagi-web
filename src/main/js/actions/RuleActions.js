var types = require('../constants/RuleActionTypes');

var RuleActions = {
  setRuleId : function(id) {
    return {
      type : types.SET_RULE_ID,
      id : id
    };
  },  
  setFusionPropertyA : function(id, fusionPropertyA) {
    return {
      type : types.SET_FUSION_PROPERTY_A,
      activeId: id,
      fusionPropertyA : fusionPropertyA
    };
  },
  setFusionPropertyB : function(id, fusionPropertyB) {
    return {
      type : types.SET_FUSION_PROPERTY_B,
      activeId: id,
      fusionPropertyB : fusionPropertyB
    };
  }  
};
  
module.exports = RuleActions;