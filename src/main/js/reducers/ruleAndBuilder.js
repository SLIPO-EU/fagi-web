var types = require('../constants/RuleAndBuilderActionTypes');
var _ = require('lodash');

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
    case types.SET_RULE_ID:
      return Object.assign({}, state, {
        id: action.id
      });
    case types.SET_FUSION_PROPERTY_A:
      let rA = state.rules;
      var index = _.findIndex(rA, {id: action.activeId});
      
      let ruleA = rA[index];
      ruleA.fusionPropertyA = action.fusionPropertyA;
      rA.splice(index, 1, ruleA);
      
      return Object.assign({}, state, {
        fusionPropertyA: action.fusionPropertyA,
        activeId:action.activeId,
        rules: rA
      });        
    case types.SET_FUSION_PROPERTY_B:
      
      let rB = state.rules;
      var index = _.findIndex(rB, {id: action.activeId});
      
      let ruleB = rB[index];
      ruleB.fusionPropertyB = action.fusionPropertyB;
      rB.splice(index, 1, ruleB);
      
      return Object.assign({}, state, {
        fusionPropertyB: action.fusionPropertyB,
        activeId:action.activeId,
        rules: rB
      });      
    default:
      return state || initialState;
  }
};

module.exports = ruleBuilder;