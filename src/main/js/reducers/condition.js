var types = require('../constants/ConditionActionTypes');

var initialState = {
  datasetId: null,
  threshold: null
};

var condition = function(state, action) {
  switch (action.type) { 
    case types.SET_DATASET:
      return Object.assign({}, state, {
        datasetId: action.datasetId
      });    
    case types.SET_THRESHOLD:
      return Object.assign({}, state, {
        threshold: action.threshold
      });
    default:
      return state || initialState;
  }
};


module.exports = condition;
