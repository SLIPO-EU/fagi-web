var types = require('../constants/RuleBuilderActionTypes');

var RuleBuilderActions = {
  addRule : function(rule) {
    return {
      type : types.ADD_RULE,
      rule : rule
    };
  },
  removeRule : function(rule) {
    return {
      type : types.REMOVE_RULE,
      rule : rule
    };
  }
};
  
module.exports = RuleBuilderActions;