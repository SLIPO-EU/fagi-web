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
  },
  setPropertyA : function(propertyA) {
    return {
      type : types.SET_PROPERTY_A,
      propertyA : propertyA
    };
  },
  setPropertyB : function(propertyB) {
    return {
      type : types.SET_PROPERTY_B,
      propertyB : propertyB
    };
  },  

};
  
module.exports = RuleBuilderActions;