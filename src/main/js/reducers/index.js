import {combineReducers} from "redux";

import app from "./app";
import ruleBuilder from "./ruleBuilder";
import rule from "./rule";

export default combineReducers({
  app,
  ruleBuilder,
  rule
})
