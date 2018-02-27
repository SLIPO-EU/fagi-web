const React = require('react');
const ReactDOM = require('react-dom');
require('./query-builder.scss');
import QueryBuilder from 'react-querybuilder';

var functions = require('../constants/functions');
var labels = require('../constants/labels');
var combinators = require('../constants/combinators');
var properties = require('../constants/properties');
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
  console.log(query);
}

function customOperatorSelector() {
  let propertyInput = class PropertyA extends React.Component {
      constructor(props) {
          super(props);
      }

      render() {
        console.log(this);

        return (
          <div className="PropertyBox">
            <div className="PropertyBox_content">
              <label forhtml="propertyA">Property for dataset A:&nbsp;</label>
                {propertySelect}             
            </div>
            <div className="PropertyBox_content">
              <label>Property for dataset B:&nbsp;</label>
                {propertySelect}             
            </div>
            <div className="PropertyBox_content">
              <label>Threshold:&nbsp;</label>
            </div>
            <div className="PropertyBox_content">
              <input type="text"
                    value={this.props.value}
                    onChange={e => this.props.handleOnChange(e.target.value)}/>            
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

  
class RuleBuilder extends React.Component {

  constructor(props) {
    super(props);
  }
  
  componentWillMount() {
  
    this.setState({fusionProps: null});
    console.log(this);
  }  
  
  render() {

    console.log(this);

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

export default RuleBuilder;