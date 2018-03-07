var types = require('../constants/ValidatorActionTypes');

var ValidatorActions = {
  addValidationRule : function(validationRuleId) {
    return {
      type : types.ADD_VALIDATION_RULE,
      validationRuleId : validationRuleId
    };
  },
  removeValidationRule : function(validationRuleId) {
    return {
      type : types.REMOVE_VALIDATION_RULE,
      validationRuleId : validationRuleId
    };
  }
};
  
module.exports = ValidatorActions;