var types = require('../constants/FusionPropertyActionTypes');

var FusionPropertyActions = {

  setPropertyA : function(propertyA) {
    return {
      type : types.SET_PROPERTY_A,
      propertyA : propertyA
    };
  },
  setPropertyB : function(propertyB) {
    return {
      type : types.SET_PROPERTY_B,
      propertyB : propertyB
    };
  }
};
  
module.exports = FusionPropertyActions;