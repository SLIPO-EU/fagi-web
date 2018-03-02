var types = require('../constants/RuleBuilderActionTypes');

var RuleBuilderActions = {
  addRule : function(rules) {
    return {
      type : types.ADD_RULE,
      rules : rules
    };
  },
  removeRule : function(rules) {
    return {
      type : types.REMOVE_RULE,
      rules : rules
    };
  }
};
  
module.exports = RuleBuilderActions;