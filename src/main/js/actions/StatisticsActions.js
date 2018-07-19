var types = require('../constants/StatisticsActionTypes');
var api = require('../api/statistics');

var requestStatistics = function () {
  return {
    type: types.REQUEST_RUN_STATISTICS
  };
};

var receivedStatistics = function (success, errors, stats) { 
  return {
    type: types.RECEIVED_STATISTICS,
    success: success,
    errors: errors,
    statistics: stats
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
  },
  runSelectedStatistics : function(selectedStatistics) {
    //todo: alert user when cofnig is not set.
    return function(dispatch, getState) {
      dispatch(requestStatistics());
      return api.runSelectedStatistics(selectedStatistics).then(function (response) {

        let stats = JSON.parse(response.jsonString);
        
        if(response.errors.length > 0){
          alert(response.errors[0].code + ": "+ response.errors[0].description);
        }
        
        dispatch(receivedStatistics(response.success, response.errors, stats));
      }, function (error) {
        dispatch(receivedStatistics(false, error, null));
      });
    };
  }  
};
  
module.exports = StatisticsActions;