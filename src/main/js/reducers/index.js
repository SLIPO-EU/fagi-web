import {combineReducers} from "redux";

import app from "./app";
import validator from "./validator";
import rule from "./rule";
//import actionRule from "./actionRule";
//import condition from "./condition";

export default combineReducers({
  app,
  validator,
  rule
})
