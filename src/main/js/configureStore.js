var {createStore, applyMiddleware} = require('redux');

var rootReducer = require('./reducers/index');


function configureStore(initialState) {
  return createStore(rootReducer, initialState);
}

module.exports = configureStore;
