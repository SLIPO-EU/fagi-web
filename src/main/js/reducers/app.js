var types = require('../constants/AppActionTypes');

var initialState = {
  datasetAction: null,
  success: null,
  error: null,
  loading: null,
  calculating: null,
  config: null,
  fusionComplete: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.SET_DATASET_ACTION:
      return Object.assign({}, state, {
        datasetAction: action.datasetAction
      });
    case types.REQUEST_FUSE:
      return Object.assign({}, state, {
        calculating: true
      });
    case types.RESPONSE_FUSE:
      if(!action.success){
        console.log(action.error[0].code + ": " + action.error[0].description);
        alert(action.error[0].code + ": " + action.error[0].description);
      }
      return Object.assign({}, state, {
        calculating: false,
        fusionComplete:true,
        success: action.success,
        error: action.error
      });
    case types.REQUEST_DOWNLOAD:
      return Object.assign({}, state, {
        calculating: true
      });
    case types.RESPONSE_DOWNLOAD:
      if(!action.success){
        console.log(action.error[0].code + ": " + action.error[0].description);
        alert(action.error[0].code + ": " + action.error[0].description);
      }
      return Object.assign({}, state, {
        calculating: false,
        success: action.success,
        error: action.error
      });
    default:
      return state;
  }
};
