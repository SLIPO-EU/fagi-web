import {combineReducers} from "redux";

import app from "./app";
import validator from "./validator";
import rule from "./rule";

export default combineReducers({
  app,
  validator,
  rule
})
