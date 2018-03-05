var types = require('../constants/RuleBuilderActionTypes');

var initialState = {
  rules: []
};

var ruleBuilder = function(state, action) {

  switch (action.type) {
    case types.ADD_RULE:

      var updatedRules = state.rules;
      updatedRules.push(action.rule);

      return Object.assign({}, state, {
        rules : updatedRules
      });
    case types.REMOVE_RULE:

      var _updatedRules = state.rules;
      var updatedRules2 = _updatedRules.filter(function( rule ) {
        return rule.id !== action.ruleId;
      });      
      return Object.assign({}, state, {
        rules : updatedRules2
      });   
    default:
      return state || initialState;
  }
};

module.exports = ruleBuilder;
