var types = require('../constants/ConditionActionTypes');

var ConditionActions = {
  setDataset : function(datasetId) {
    return {
      type : types.SET_DATASET,
      datasetId : datasetId
    };
  },
  
  setThreshold : function(threshold) {
    return {
      type : types.SET_THRESHOLD,
      threshold : threshold
    };
  }
};

module.exports = ConditionActions;