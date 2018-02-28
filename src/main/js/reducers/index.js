var {combineReducers} = require('redux');
var {routerReducer} = require('react-router-redux');

var fusionProperty = require('./fusionProperty');

var indexReducer = combineReducers({
  fusionProperty
});

module.exports = indexReducer;
