var types = require('../constants/RuleActionTypes');

var RuleBuilderActions = {
  addRule : function(rule) {
    return {
      type : types.ADD_RULE,
      rule : rule
    };
  },
  removeRule : function(ruleId) {
    return {
      type : types.REMOVE_RULE,
      ruleId : ruleId
    };
  },
  updateActionRules : function(ruleId, actionRuleId, query) {
    return {
      type : types.UPDATE_ACTION_RULE,
      ruleId : ruleId,
      actionRuleId : actionRuleId,
      query : query
    };
  }  
};

module.exports = RuleBuilderActions;