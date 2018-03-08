var types = require('../constants/AppActionTypes');

var initialState = {
  success: null,
  error: null,
  loading: null,
  statistics: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.FUSE:
      return Object.assign({}, state, {
        success: action.success,
        error: action.error
      });
    case types.REQUEST_RUN_STATISTICS:
      return Object.assign({}, state, {
        success: action.success,
        error: action.error,
        loading:true
      });
    case types.RECEIVED_STATISTICS:
      return Object.assign({}, state, {
        success: action.success,
        error: action.error,
        statistics : action.statistics,
        loading: false
      });    
    default:
      return state;
  }
};
