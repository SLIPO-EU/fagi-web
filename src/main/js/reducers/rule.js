var types = require('../constants/RuleActionTypes');
var _ = require('lodash');

var initialState = {
  rules: []
};

var rule = function(state, action) {
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
        activeId:action.activeId,
        rules: rB
      });
    case types.ADD_ACTION_RULE:
    {

      let rules = state.rules;
      var index = _.findIndex(rules, {id: action.activeRuleId});

      let currentRule = rules[index];

      let actionRules;
      if(currentRule.actionRules){
        actionRules = currentRule.actionRules;
      } else {
        actionRules = [];
      }
      
      actionRules.push({id:action.actionRuleId});
      currentRule.actionRules = actionRules;
      rules.splice(index, 1, currentRule);  

      return Object.assign({}, state, {
        rules : rules
      });
    }
    case types.REMOVE_ACTION_RULE:
    {

      let rules = state.rules;
      var index = _.findIndex(rules, {id: action.activeId});
      
      let currentRule = rules[index];

      var actionRules = currentRule.actionRules.filter(function( actionRule ) {
        return actionRule.id !== action.actionRuleId;
      });       
      
      currentRule.actionRules = actionRules;
      rules.splice(index, 1, currentRule);  

      return Object.assign({}, state, {
        rules : rules
      });      
    }  
    default:
      return state || initialState;
  }
};

module.exports = rule;
