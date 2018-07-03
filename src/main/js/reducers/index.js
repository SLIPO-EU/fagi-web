import {combineReducers} from "redux";

import configuration from "./configuration";
import app from "./app";
import validator from "./validator";
import ruleset from "./ruleset";
import statistics from "./statistics";


export default combineReducers({
  configuration,
  app,
  validator,
  ruleset,
  statistics
})
