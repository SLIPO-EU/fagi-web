
const React = require('react');
const ReactDOM = require('react-dom');

import QueryBuilder from 'react-querybuilder';

import ActionRuleBuilder from './actionRule-builder';
import Property from './property';
import { Provider } from 'react-redux';
import { createStore } from 'redux' 
require('../RuleBox.scss');

import fusionPropertyReducer from '../reducers/fusionProperty';

let store = createStore(fusionPropertyReducer);

class RuleBuilder extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      < div className = "Rule" > 
        <div>
          <button className = "Button" type="button">Add Rule</button> 
        </div>
        <div >
          < Property/ > 
        </div>
        < div > 
          < ActionRuleBuilder/ > 
        < /div>
      < /div >
    )
  }
}

export default RuleBuilder;
