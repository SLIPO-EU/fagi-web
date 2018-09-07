const React = require('react');
const ReactDOM = require('react-dom');

var functions = require('../../constants/functions');
var operators = require('../../constants/operators');
var combinators = require('../../constants/combinators');
var properties = require('../../constants/properties');
var datasetIdentifiers = require('../../constants/DatasetIdentifiers');

var ontProps;
import Select from './Select';
var propertiesConfig = require('../../helpers/properties-config');

var datasetOptions =  datasetIdentifiers.map(function(d) {
  return (
    <option key={d.key} value={d.name}>{d.label}</option>
  );
});

class Condition extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      datasetId: datasetIdentifiers[0],
      propertyA: properties[0].value, 
      propertyB: properties[0].value,
      threshold: 0
    }
  }
  
  componentWillReceiveProps(newProps) {

    //set value with setState?
    let selectedFunction = functions.find(f => f.name === newProps.field);
    if(selectedFunction.parameterCount !== 1){
      this.setState({datasetId: null});
    }
  }

  selectDatasetIdentifier(e){
    this.props.setDataset(this.props.ruleId, this.props.actionRuleId, e);
  }
  
  selectActionRulePropertyA(e){

    this.props.setActionPropertyA(this.props.ruleId, this.props.actionRuleId, e);
    
    let propA = properties.find(p => p.value === e);
    
    this.setState({propertyA:propA});
  }

  selectActionRulePropertyB(e){

    this.props.setActionPropertyB(this.props.ruleId, this.props.actionRuleId, e);
    
    let propB = properties.find(p => p.value === e);
    
    this.setState({propertyB:propB});
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
          <select className="simple-select"
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

    } else if(selectedFunction.type === 4){

      propertySelectionLabel1 = 'Property for dataset A: ';
      propertySelectionLabel2 = 'Property for dataset B: ';

      thresholdLabel = (
        <div className="SelectBox_content">
          <label>Threshold:&nbsp;</label>
        </div>
      );

      thresholdField = (
        <div className="Threshold-border" >
          <input className= "Threshold" type="text"
            value={this.state.value}
            onChange={e => this.onThresholdChange(e.target.value)}/>
        </div>
       );
    }

    let opts = this.props.ontology.properties ? this.props.ontology.properties : properties;

    var propertySelect1 = (
      <div className="SelectBox_content">
        <label>{propertySelectionLabel1}&nbsp;</label>
        <Select 
          id={'3'}
          options={opts ? opts : []}
          onChange={e => this.selectActionRulePropertyA(e)} 
          title = "Choose property">
        </Select>
      </div>
    );

    var propertySelect2 = selectedFunction.parameterCount !== 1 ? (
      <div className="SelectBox_content">
        <label>{propertySelectionLabel2}&nbsp;</label>
        <Select 
          id={'4'}
          options={opts ? opts : []}
          onChange={e => this.selectActionRulePropertyB(e)} 
          title = "Choose property">
        </Select>
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

export default Condition;