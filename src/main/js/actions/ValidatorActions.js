var types = require('../constants/ValidatorActionTypes');
var validatorActionConstants = require('../constants/ValidatorActionConstants');

var ValidatorActions = {
  
  addValidationRule : function(validationRuleId) {
    return {
      type : types.ADD_VALIDATION_RULE,
      validationRuleId : validationRuleId,
      validationAction : validatorActionConstants[0].name
    };
  },
  
  removeValidationRule : function(validationRuleId) {
    return {
      type : types.REMOVE_VALIDATION_RULE,
      validationRuleId : validationRuleId
    };
  },
  
  setDefaultValidationAction : function(defaultValidationAction) {
    return {
      type : types.SET_DEFAULT_VALIDATION_ACTION,
      defaultValidationAction : defaultValidationAction
    };
  },
  
  selectValidationAction : function(actionRuleId, validationAction) {
    return {
      type : types.SELECT_VALIDATION_ACTION,
      actionRuleId : actionRuleId,
      validationAction : validationAction
    };
  },
  
  updateActionRules : function(actionRuleId, query) {
    return {
      type : types.UPDATE_VALIDATION_ACTION_RULE,
      actionRuleId : actionRuleId,
      query : query
    };
  }
};
  
module.exports = ValidatorActions;