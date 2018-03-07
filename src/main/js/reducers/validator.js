var types = require('../constants/ValidatorActionTypes');
var _ = require('lodash');

var initialState = {
  rules: []
};

var validator = function(state, action) {
  switch (action.type) {
    case types.ADD_VALIDATION_RULE:
    {

      let actionRules = state.rules;
      actionRules.push({id:action.actionRuleId});   
      return Object.assign({}, state, {
        rules : actionRules
      });
    }
    case types.REMOVE_VALIDATION_RULE:
    {
      var actionRules = state.rules.filter(function( actionRule ) {
        return actionRule.id !== action.actionRuleId;
      });       

      return Object.assign({}, state, {
        rules : actionRules
      });      
    }      
    default:
      return state || initialState;
  }
};

module.exports = validator;
