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
        rules : updatedRules,
        ruleGroup : updatedRules
      });
    case types.REMOVE_RULE:
      //TODO: remove by id
      return Object.assign({}, state, {
        rules : action.rules
      });   
    default:
      return state || initialState;
  }
};

module.exports = ruleBuilder;
