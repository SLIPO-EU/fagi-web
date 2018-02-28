var types = require('../constants/FusionPropertyActionTypes');

var initialState = {
  propertyA: null,
  propertyB: null
};

export default (state = initialState, action) => {
  switch (action.type) {
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
