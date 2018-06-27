var types = require('../constants/ConfigurationActionTypes');
var api = require('../api/fusion');

var requestUpload = function () {
  return {
    type: types.UPLOAD_FILE_REQUEST
  };
};

var uploadResponse = function (success, errors) {
  return {
    type: types.UPLOAD_FILE_RESPONSE,
    success: success,
    errors: errors
  };
};

var AppActions = {
  uploadFile : function(file) {
    return function(dispatch, getState) {
      dispatch(requestUpload());
      return api.upload(file).then(function (response) {
        dispatch(uploadResponse(response.success, response.errors));
      }, function (error) {
        dispatch(uploadResponse(false, error));
      });
    };
  }
};
  
module.exports = AppActions;