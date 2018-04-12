var types = require('../constants/AppActionTypes');
var api = require('../api/fusion');

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

var requestFuse = function () {
  return {
    type: types.REQUEST_FUSE
  };
};

var responseFuse = function (success, error) {
  return {
    type: types.RESPONSE_FUSE,
    success: success,
    error: error
  };
};


var AppActions = {
  setDatasetAction : function(action) {
    return {
      type : types.SET_DATASET_ACTION,
      datasetAction : action
    };
  },

  fuse : function(config) {
    return function(dispatch, getState) {
      dispatch(requestFuse());
      return api.fuse(config).then(function (response) {
        dispatch(responseFuse(response.success, response.errors));
      }, function (error) {
        dispatch(responseFuse(false, error));
      });
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