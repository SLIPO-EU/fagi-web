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

      properties = properties.filter(function( obj ) {
        return obj.key !== "name → nameValue";
      });
      properties = properties.filter(function( obj ) {
        return obj.key !== "hasGeometry → asWKT";
      });
      properties = properties.filter(function( obj ) {
        return obj.key !== "address → street";
      });
      properties = properties.filter(function( obj ) {
        return obj.key !== "address → number";
      });
      properties = properties.filter(function( obj ) {
        return obj.key !== "address → postCode";
      });
      properties = properties.filter(function( obj ) {
        return obj.key !== "phone → contactValue";
      });
      properties = properties.filter(function( obj ) {
        return obj.key !== "email → contactValue";
      });
      properties = properties.filter(function( obj ) {
        return obj.key !== "fax → contactValue";
      });
      properties = properties.filter(function( obj ) {
        return obj.key !== "website";
      });
      properties = properties.filter(function( obj ) {
        return obj.key !== "openingHours → concat";
      });
      
      properties.unshift({key: "website", label: "website", value: "http://slipo.eu/def#homepage"});
      properties.unshift({key: "openingHours → concat", label: "openingHours → concat", value: "http://slipo.eu/def#openingHours http://slipo.eu/def#concat"});
      properties.unshift({key: "fax → contactValue", label: "fax → contactValue", value: "http://slipo.eu/def#fax http://slipo.eu/def#contactValue"});
      properties.unshift({key: "email → contactValue", label: "email → contactValue", value: "http://slipo.eu/def#email http://slipo.eu/def#contactValue"});
      properties.unshift({key: "phone → contactValue", label: "phone → contactValue", value: "http://slipo.eu/def#phone http://slipo.eu/def#contactValue"});
      properties.unshift({key: "address → postcode", label: "address → postcode", value: "http://slipo.eu/def#address http://slipo.eu/def#postcode"});
      properties.unshift({key: "address → number", label: "address → number", value: "http://slipo.eu/def#address http://slipo.eu/def#number"});
      properties.unshift({key: "address → street", label: "address → street", value: "http://slipo.eu/def#address http://slipo.eu/def#street"});
      properties.unshift({key: "hasGeometry → asWKT", label: "hasGeometry → asWKT", value: "http://www.opengis.net/ont/geosparql#hasGeometry http://www.opengis.net/ont/geosparql#asWKT"});
      properties.unshift({key: "name → nameValue", label: "name → nameValue", value: "http://slipo.eu/def#name http://slipo.eu/def#nameValue"});

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
