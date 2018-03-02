import {combineReducers} from "redux";

import fusionProperties from "./fusionProperty";
import app from "./app";

export default combineReducers({
  app,
  fusionProperties
})
