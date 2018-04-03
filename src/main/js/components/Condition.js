const React = require('react');
const ReactDOM = require('react-dom');
require('./query-builder.scss');

import QueryBuilder from 'react-querybuilder';

var { bindActionCreators } = require('redux');
var { connect} = require('react-redux');
var functions = require('../constants/functions');
var operators = require('../constants/operators');
var labels = require('../constants/labels');
var combinators = require('../constants/combinators');
var properties = require('../constants/properties');
var datasetIdentifiers = require('../constants/DatasetIdentifiers');
var { setDataset, setThreshold } = require('../actions/ConditionActions');
  
var propertyOptions =  properties.map(function(property) {
  return (
    <option type1={property.type} key={property.key} value ={property.value}>{property.label}</option>
  );
});

var datasetOptions =  datasetIdentifiers.map(function(d) {
  return (
    <option key={d.key} value={d.name}>{d.label}</option>
  );
});

class Condition extends React.Component {

  constructor(props) {
    super(props);
  }

  componentDidMount(){

    this.setState({

      datasetId: datasetIdentifiers[0],
      propertyA: properties[0].value, 
      propertyB: properties[0].value,
      threshold: 0
    });

  }
  
  componentWillReceiveProps(newProps) {

    //set value with setState?
    let selectedFunction = functions.find(f => f.name === newProps.field);
    if(selectedFunction.parameterCount !== 1){
      this.setState({datasetId: null});
    }
  }

  selectDatasetIdentifier(e){
    console.log(e);
    this.props.setDataset(this.props.ruleId, this.props.actionRuleId, e);
  }
  
  selectActionRulePropertyA(e){
    this.props.setActionPropertyA(this.props.ruleId, this.props.actionRuleId, e);
    this.setState({propertyA:e});
  }

  selectActionRulePropertyB(e){
    this.props.setActionPropertyB(this.props.ruleId, this.props.actionRuleId, e);
    this.setState({propertyB:e});
  }


  onThresholdChange(e){
    this.props.setThreshold(this.props.ruleId, this.props.actionRuleId, e);
  }

  render() {

    let selectedFunction = functions.find(f => f.name === this.props.field);
    let datasetSelectionLabel;
    let propertySelectionLabel1;
    let propertySelectionLabel2;
    let thresholdLabel;
    let thresholdField;
    let datasetSelection;

    if(selectedFunction.parameterCount === 1){
      datasetSelectionLabel = 'From Dataset: ';

      datasetSelection = (
        <div className="SelectBox_content">
          <label >{datasetSelectionLabel}&nbsp;</label>
          <select 
            onChange={e => this.selectDatasetIdentifier(e.target.value)} 
            title = "Choose property" >
            {datasetOptions}
          </select>
        </div>
      );

      propertySelectionLabel1 = 'Property: ';

      thresholdLabel = null;
      thresholdField = null;

    } else if (selectedFunction.parameterCount === 2){

      propertySelectionLabel1 = 'Property for dataset A: ';
      propertySelectionLabel2 = 'Property for dataset B: ';
      thresholdLabel = null;
      thresholdField = null;

    } else if(selectedFunction.parameterCount === 3){

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
            onChange={e => this.onThresholdChange(e.target.value)}/>
        </div>
       );
    }

    var propertySelect1 = (
      <div className="SelectBox_content">
        <label>{propertySelectionLabel1}&nbsp;</label>
        <select 
          onChange={e => this.selectActionRulePropertyA(e.target.value)} 
          title = "Choose property">
          {propertyOptions}
        </select>
      </div>
    );

    var propertySelect2 = selectedFunction.parameterCount !== 1 ? (
      <div className="SelectBox_content">
        <label>{propertySelectionLabel2}&nbsp;</label>
        <select 
          onChange={e => this.selectActionRulePropertyB(e.target.value)} 
          title = "Choose property">
          {propertyOptions}
        </select>
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

function mapStateToProps(state, ownProps) {
  return {
    condition : state.condition
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions : bindActionCreators(Object.assign({}, {setDataset, setThreshold}) , dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Condition);