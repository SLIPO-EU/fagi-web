var types = require('../constants/RuleActionTypes');

var RuleActions = {
  setRuleId : function(id) {
    return {
      type : types.SET_RULE_ID,
      id : id
    };
  },
  
  setDefaultFusionAction : function(id, defaultRuleAction) {
    return {
      type : types.SET_DEFAULT_RULE_ACTION,
      activeId: id,
      defaultRuleAction : defaultRuleAction
    };
  },
  
  changeFusionAction : function(ruleId, actionRuleId, fusionAction) {
    return {
      type : types.CHANGE_FUSION_ACTION,
      ruleId : ruleId,
      actionRuleId : actionRuleId,
      fusionAction : fusionAction
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
  },
  addActionRule : function(activeRuleId, actionRuleId) {
    return {
      type : types.ADD_ACTION_RULE,
      activeRuleId: activeRuleId,
      actionRuleId : actionRuleId
    };
  },
  removeActionRule : function(ruleId, actionRuleId) {
    return {
      type : types.REMOVE_ACTION_RULE,
      activeId: ruleId,
      actionRuleId : actionRuleId
    };
  }  
};
  
module.exports = RuleActions;