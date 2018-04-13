var types = require('../constants/ValidatorActionTypes');
var _ = require('lodash');

var initialState = {
  rules: []
};

var validator = function(state, action) {
  switch (action.type) {
    case types.ADD_VALIDATION_RULE:
    {
      
      let validationRules = state.rules;
      validationRules.push({id:action.validationRuleId, validationAction:action.validationAction});
      
      return Object.assign({}, state, {
        rules : validationRules
      });
    }
    case types.REMOVE_VALIDATION_RULE:
    {
      var validationRules = state.rules.filter(function( validationRule ) {
        return validationRule.id !== action.validationRuleId;
      });       

      return Object.assign({}, state, {
        rules : validationRules
      });      
    } 
    case types.SET_DEFAULT_VALIDATION_ACTION:
      return Object.assign({}, state, {
        defaultValidationAction: action.defaultValidationAction
      });
    case types.SELECT_VALIDATION_ACTION:
    {  

      let ar = state.rules.find(function(actionRule) {
        return actionRule.id == action.actionRuleId
      });

      ar.validationAction = action.validationAction;
      return Object.assign({}, state, {
        rules : state.rules
      });
    }    
    case types.UPDATE_VALIDATION_ACTION_RULE:
      
      let ar = state.rules.find(function(actionRule) {
        return actionRule.id == action.actionRuleId
      });

      ar.query = action.query;

      return Object.assign({}, state, {
        rules : state.rules
      });    
    default:
      return state || initialState;
  }
};

module.exports = validator;
