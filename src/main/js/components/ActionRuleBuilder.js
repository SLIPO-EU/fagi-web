const React = require('react');
const ReactDOM = require('react-dom');
require('./query-builder.scss');
import QueryBuilder from 'react-querybuilder';

var functions = require('../constants/functions');
var labels = require('../constants/labels');
var combinators = require('../constants/combinators');
var properties = require('../constants/properties');

var options =  properties.map(function(property) {
  return (
    <option key={property.key} value ={property.value}>{property.label}</option>
  );
});

var propertySelect = 
  (
    < select 
      onChange={e => this.props.handleOnChange(e.target.value)} 
      title = "Choose property" >
      {options}
    < /select>
  );

var controlElements = {
  operatorSelector: customOperatorSelector(),
  valueEditor: customValueEditor()
}

function logQuery(query) {
  console.log('query:');
  console.log(query);
}

function customOperatorSelector() {
  
  let propertyInput = class PropertyA extends React.Component {
    
    constructor(props) {
        super(props);
    }

    selectActionRulePropertyA(e){
      console.log(e);
    }
    
    selectActionRulePropertyB(e){
      console.log(e);
    }
    
    render() {

      return (
        <div className="PropertyBox">
          <div className="PropertyBox_content">
            <label forhtml="propertyA">Property for dataset A:&nbsp;</label>
            < select 
              onChange={e => this.selectActionRulePropertyA(e.target.value)} 
              title = "Choose property" >
              {options}
            < /select>
          </div>
          <div className="PropertyBox_content">
            <label>Property for dataset B:&nbsp;</label>
            < select 
              onChange={e => this.selectActionRulePropertyA(e.target.value)} 
              title = "Choose property" >
              {options}
            < /select>
          </div>
          <div className="PropertyBox_content">
            <label>Threshold:&nbsp;</label>
          </div>
          <div className="PropertyBox_content">
            <input type="text"
                  value={this.props.value}
                  onChange={e => click(e.target.value, this)}/>
          </div>
        </div>
      );
    }
  };
  
  return propertyInput;
}

function customValueEditor() {
      let properties = class Properties extends React.Component {
          constructor(props) {
              super(props);
          }
          render() {
              return (<span></span>);
          }
      };
      return properties;
  }

  
class ActionRuleBuilder extends React.Component {

  constructor(props) {
    super(props);
  }
  
  componentWillMount() {

  }
  
  componentDidMount() {

  }
  
  render() {
    return (
      < div className="query-builder"> 
        < QueryBuilder
          fields = {functions}
          translations = {labels}
          combinators = {combinators}
          controlElements = {controlElements}
          onQueryChange = {logQuery} / > 
      < /div>
    );
  }
}

export default ActionRuleBuilder;