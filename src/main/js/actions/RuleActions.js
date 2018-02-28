var types = require('../constants/RuleActionTypes');

var RuleActions = {

  addRule : function(rules) {
    return {
      type : types.SET_PROPERTY_A,
      rules : rules
    };
  },
  removeRule : function(rules) {
    return {
      type : types.SET_PROPERTY_B,
      rules : rules
    };
  }
};
  
module.exports = RuleActions;