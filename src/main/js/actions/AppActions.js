var types = require('../constants/AppActionTypes');
var api = require('../api/fusion');

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
    delete config.ruleset.activeId;
    delete config.ruleset.id;
    return function(dispatch, getState) {
      dispatch(requestFuse());
      return api.fuse(config).then(function (response) {
        dispatch(responseFuse(response.success, response.errors));
      }, function (error) {
        dispatch(responseFuse(false, error));
      });
    };
  }
};
  
module.exports = AppActions;