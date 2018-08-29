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

var requestDownload = function () {
  return {
    type: types.REQUEST_DOWNLOAD
  };
};

var responseDownload = function (success, error, token) {
  return {
    type: types.RESPONSE_DOWNLOAD,
    token: token,
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
  }, 

  download : function() {
    return function(dispatch, getState) {
      dispatch(requestDownload());
      return api.compress().then(function (response) {

        dispatch(responseDownload(response.success, response.errors, response));
        var link = document.createElement('a');
        link.href = `/action/fusion/download`;
        link.download = '';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

      }, function (error) {
        dispatch(responseDownload(false, error));
      });
    };
  }
};
  
module.exports = AppActions;