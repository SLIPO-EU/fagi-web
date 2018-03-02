var types = require('../constants/RuleBuilderActionTypes');

var initialState = {
  rules: [{id:0}]
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.ADD_RULE:
      var updatedRules = state.rules;
      updatedRules.push(action.rule);
      return Object.assign({}, state, {
        rules : action.rules
      });
    case types.REMOVE_RULE:
      //var updatedRules = state.rules;
      //updatedRules.push(action.rule);
      return Object.assign({}, state, {
        rules : action.rules
      });  
    case types.SET_PROPERTY_A:
      return Object.assign({}, state, {
        propertyA : action.propertyA
      });  

    case types.SET_PROPERTY_B:
      return Object.assign({}, state, {
        propertyB: action.propertyB
      });    
    default:
      return state;
  }
};
