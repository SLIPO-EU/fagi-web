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
    }

    
    render() {

      let selectedFunction = functions.find(f => f.name === this.props.field);
      let datasetSelectionLabel;
      let propertySelectionLabel1;
      let propertySelectionLabel2;
      let thresholdLabel;
      let thresholdField;
      let datasetSelection;

      if(selectedFunction.parCount === 1){
        datasetSelectionLabel = 'From Dataset: ';

        datasetSelection = (
          <div className="SelectBox_content">
            <label >{datasetSelectionLabel}&nbsp;</label>
            < select 
              onChange={e => this.selectActionRulePropertyA(e.target.value)} 
              title = "Choose property" >
              {datasetOptions}
            < /select>
          </div>
        );

        propertySelectionLabel1 = 'Property: ';

        thresholdLabel = null;
        thresholdField = null;

      } else if (selectedFunction.parCount === 2){
        propertySelectionLabel1 = 'Property for dataset A: ';
        propertySelectionLabel2 = 'Property for dataset B: ';
        thresholdLabel = null;
        thresholdField = null;
        
      } else if(selectedFunction.parCount === 3){
        
        propertySelectionLabel1 = 'Property for dataset A: ';
        propertySelectionLabel2 = 'Property for dataset B: ';
        
        thresholdLabel = (
          <div className="SelectBox_content">
            <label>Threshold:&nbsp;</label>
          </div>
        );
       
        thresholdField = (
         <div className="Threshold">
           <input type="text"
             value={this.state.value}
             onChange={e => this.onThresholdChange(e.target.value, this)}/>
         </div>
         );
       
      }

      var propertySelect1 = (
          <div className="SelectBox_content">
            <label>{propertySelectionLabel1}&nbsp;</label>
            < select 
              onChange={e => this.selectActionRulePropertyA(e.target.value)} 
              title = "Choose property" >
              {propertyOptions}
            < /select>
          </div>
       );

      var propertySelect2 = selectedFunction.parCount !== 1 ? (
          <div className="SelectBox_content">
            <label>{propertySelectionLabel2}&nbsp;</label>
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
        <div className="SelectBox">
          {datasetSelection}
          {propertySelect1}
          {propertySelect2}
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