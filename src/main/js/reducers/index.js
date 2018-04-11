import {combineReducers} from "redux";

import app from "./app";
import validator from "./validator";
import ruleset from "./ruleset";

export default combineReducers({
  app,
  validator,
  ruleset
})
