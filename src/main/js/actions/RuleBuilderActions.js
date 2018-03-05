var types = require('../constants/RuleAndBuilderActionTypes');

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
  }
};
  
module.exports = RuleBuilderActions;