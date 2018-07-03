var types = require('../constants/StatisticsActionTypes');
var api = require('../api/statistics');

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

var StatisticsActions = {

  runStatistics : function() {
    return function(dispatch, getState) {
      dispatch(requestStatistics());
      return api.runStatistics().then(function (response) {
        dispatch(receivedStatistics(response.success, response.errors, response.statPairsA, response.statPairsB));
      }, function (error) {
        dispatch(receivedStatistics(false, error, null));
      });
    };
  }
};
  
module.exports = StatisticsActions;