var types = require('../constants/ConfigurationActionTypes');
var propertiesConfig = require('../helpers/properties-config');

var initialState = {
  loading: null,
  ontology: {}
};

var configuration = function(state, action) {
  switch (action.type) {
    case types.UPLOAD_FILE_REQUEST:
      return Object.assign({}, state, {
        loading : true
      });
    case types.UPLOAD_FILE_RESPONSE:
      if(!action.success){
        alert(action.errors[0].code + ": " + action.errors[0].description);
        return Object.assign({}, state, {
          loading : false,
          ontology : null
        });
      }

      let properties = propertiesConfig.getShapedProperties(action.ontology.properties);
      let shapedOntology = {properties: properties, numberOfClasses:action.ontology.numberOfClasses, numberOfProperties: properties.length};

      return Object.assign({}, state, {
        loading : false,
        ontology : shapedOntology
      });
    case types.SUBMIT_RESPONSE:
      if(!action.success){
        alert(action.errors[0].code + ": " + action.errors[0].description);
        return Object.assign({}, state, {
          loading : false,
          configXML : null
        });
      }
      return Object.assign({}, state, {
        loading : false,
        configXML : action.configXML
      });
    default:
      return state || initialState;
  }
};

module.exports = configuration;
