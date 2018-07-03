var types = require('../constants/StatisticsActionTypes');

var initialState = {
  success: null,
  error: null,
  statistics: null,
  loading: null
};

export default (state = initialState, action) => {
  switch (action.type) {    
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
