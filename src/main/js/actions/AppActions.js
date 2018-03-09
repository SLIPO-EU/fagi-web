var types = require('../constants/AppActionTypes');
var statisticsAPI = require('../api/statistics');

var requestStatistics = function () {
  return {
    type: types.REQUEST_RUN_STATISTICS
  };
};

var receivedStatistics = function (success, errors, pairsA, pairsB) {
  return {
    type: types.RECEIVED_STATISTICS,
    success: success,
    errors: errors,
    statistics: [{pairsA},{pairsB}]
  };
};

var AppActions = {
  setDatasetAction : function(action) {
    return {
      type : types.SET_DATASET_ACTION,
      datasetAction : action
    };
  },
  fuse : function(success, error) {
    return {
      type : types.FUSE,
      success : success,
      error : error
    };
  },
  runStatistics : function() {
    return function(dispatch, getState) {
      dispatch(requestStatistics());
      return statisticsAPI.runStatistics().then(function (response) {
        dispatch(receivedStatistics(response.success, response.errors, response.statPairsA, response.statPairsB));
      }, function (error) {
        dispatch(receivedStatistics(false, error, null));
      });
    };
  }
};
  
module.exports = AppActions;