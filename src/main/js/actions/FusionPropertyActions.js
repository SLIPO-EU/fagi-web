var types = require('../constants/PropertyPairActionTypes');

var FusionPropertyPairActions = {

  setProperty : function(fusionProperty) {
    return {
      type : types.SET_PROPERTY,
      fusionProperty : fusionProperty
    };
  }
};
  
module.exports = FusionPropertyPairActions;