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
      validationRules.push({id:action.validationRuleId});   
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
    default:
      return state || initialState;
  }
};

module.exports = validator;
