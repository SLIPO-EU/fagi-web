const React = require('react');
const ReactDOM = require('react-dom');
require('./query-builder.scss');
import QueryBuilder from 'react-querybuilder';

var functions = require('../constants/functions');
var labels = require('../constants/labels');
var combinators = require('../constants/combinators');
var properties = require('../constants/properties');
var datasetIdentifiers = require('../constants/DatasetIdentifiers');

var propertyOptions =  properties.map(function(property) {
  return (
    <option key={property.key} value ={property.value}>{property.label}</option>
  );
});

var datasetOptions =  datasetIdentifiers.map(function(d) {
  return (
    <option key={d.key} value ={d.value}>{d.label}</option>
  );
}); 

var controlElements = {
  operatorSelector: customOperatorSelector(),
  valueEditor: customValueEditor()
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
    
    componentDidMount(){
      this.setState({threshold: 0});
    }
    
    onThresholdChange(e){
      console.log(e);
      console.log(this);
    }

    
    render() {

      console.log(this);
      
      let selectedFunction = functions.find(f => f.name === this.props.field);

      var thresholdLabel = selectedFunction.parCount === 3 ? (<div className="PropertyBox_content">
          <label>Threshold:&nbsp;</label>
        </div>) : null;

      var thresholdField = selectedFunction.parCount === 3 ? (
        <div className="PropertyBox_content">
          <input type="text"
            value={this.state.value}
            onChange={e => this.onThresholdChange(e.target.value, this)}/>
        </div>
        ) : null;

      var datasetSelection = selectedFunction.parCount === 1 ? (
        <div className="PropertyBox_content">
          <label forhtml="propertyA">Property for dataset A:&nbsp;</label>
          < select 
            onChange={e => this.selectActionRulePropertyA(e.target.value)} 
            title = "Choose property" >
            {datasetOptions}
          < /select>
        </div>
      ) : null;
      
      var propertySelectionLabel = selectedFunction.parCount === 1 ? 'Property: ' : 'Property for dataset A:';
      
      var selection1 = (
          <div className="PropertyBox_content">
            <label forhtml="propertyA">{propertySelectionLabel}&nbsp;</label>
            < select 
              onChange={e => this.selectActionRulePropertyA(e.target.value)} 
              title = "Choose property" >
              {propertyOptions}
            < /select>
          </div>
       );

      var selection2 = selectedFunction.parCount !== 1 ? (
          <div className="PropertyBox_content">
            <label forhtml="propertyA">Property for dataset A:&nbsp;</label>
            < select 
              onChange={e => this.selectActionRulePropertyA(e.target.value)} 
              title = "Choose property" >
              {propertyOptions}
            < /select>
          </div>
       ) : null;
       
      
      var propertyASelect;
      var propertyBSelect;
      
      return (
        <div className="PropertyBox">
          {datasetSelection}
          {selection1}
          {selection2}
          {thresholdLabel}
          {thresholdField}
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
              return (
                <span>
                </span>
               );
          }
      };
      return properties;
  }

  
class ActionRuleBuilder extends React.Component {

  constructor(props) {
    super(props);
    this.logQuery = this.logQuery.bind(this)
  }
  
  componentWillMount() {

  }
  
  componentDidMount() {

  }
    
  logQuery(e){
    console.log('query:');
    console.log(e);
  }  
  
  render() {
    return (
      < div className="query-builder"> 
        < QueryBuilder
          fields = {functions}
          translations = {labels}
          combinators = {combinators}
          controlElements = {controlElements}
          onQueryChange = {this.logQuery} / > 
      < /div>
    );
  }
}

export default ActionRuleBuilder;