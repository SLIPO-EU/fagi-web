var types = require('../constants/AppActionTypes');

var initialState = {
  success: null,
  error: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.FUSE:
      return Object.assign({}, state, {
        success: action.success,
        error: action.error
      });
    default:
      return state;
  }
};
