var types = require('../constants/ActionRuleBuilderActionTypes');
var _ = require('lodash');

var initialState = {
  query: null
};

var rule = function(state, action) {
  switch (action.type) { 
    case types.SET_QUERY:
      return Object.assign({}, state, {
        query: action.query
      });
    default:
      return state || initialState;
  }
};

module.exports = rule;
