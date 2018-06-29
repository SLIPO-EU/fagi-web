var types = require('../constants/ConfigurationActionTypes');

var initialState = {
  ontology: {}
};

var configuration = function(state, action) {
  switch (action.type) {
    case types.UPLOAD_FILE_REQUEST:
      return Object.assign({}, state, {
        loading : true
      });
    case types.UPLOAD_FILE_RESPONSE:
      return Object.assign({}, state, {
        loading : false,
        ontology : action.ontology
      });
    default:
      return state || initialState;
  }
};

module.exports = configuration;
