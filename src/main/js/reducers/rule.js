var types = require('../constants/RuleActionTypes');

var initialState = {
  id: null,
  fusionPropertyA: null,
  fusionPropertyB: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.SET_RULE_ID:
      return Object.assign({}, state, {
        id: action.id
      });
    case types.SET_FUSION_PROPERTY_A:
      return Object.assign({}, state, {
        fusionPropertyA : action.fusionPropertyA
      });
    case types.SET_FUSION_PROPERTY_B:
      return Object.assign({}, state, {
        fusionPropertyB: action.fusionPropertyB
      });    
    default:
      return state;
  }
};
