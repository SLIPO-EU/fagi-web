var types = require('../constants/AppActionTypes');

var AppActions = {

  fuse : function(success, error) {
    return {
      type : types.FUSE,
      success : success,
      error : error
    };
  }
};
  
module.exports = AppActions;