var types = require('../constants/ConfigurationActionTypes');
var api = require('../api/configuration');

var requestUpload = function () {
  return {
    type: types.UPLOAD_FILE_REQUEST
  };
};

var uploadResponse = function (success, errors, ontology) {
  return {
    type: types.UPLOAD_FILE_RESPONSE,
    ontology: ontology,
    success: success,
    errors: errors
  };
};

var submitResponse = function (success, errors, info) {
  return {
    type: types.SUBMIT_RESPONSE,
    configXML: info,
    success: success,
    errors: errors
  };
};

var AppActions = {
  uploadFile: function(file) {
    return function(dispatch, getState) {
      dispatch(requestUpload());
      return api.upload(file).then(function (response) {
        dispatch(uploadResponse(response.success, response.errors, response.ontology));
      }, function (error) {
        dispatch(uploadResponse(false, error));
      });
    };
  },
  submitConfiguration: function(file, info) {
    return function(dispatch, getState) {
      dispatch(requestUpload());
      return api.submit({name: info.name, configuration:file}).then(function (response) {
        dispatch(submitResponse(response.success, response.errors, info));
      }, function (error) {
        dispatch(submitResponse(false, error, info));
      });
    };
  }
};
  
module.exports = AppActions;