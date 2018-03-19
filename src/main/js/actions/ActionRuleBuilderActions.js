var types = require('../constants/ActionRuleBuilderActionTypes');

var ActionRuleBuilderActions = {
  setQuery : function(query) {
    return {
      type : types.SET_QUERY,
      query : query
    };
  }
};

module.exports = ActionRuleBuilderActions;