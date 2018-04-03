const React = require('react');
const ReactDOM = require('react-dom');

import QueryBuilder from 'react-querybuilder';

var { bindActionCreators } = require('redux');
var { connect} = require('react-redux');
var functions = require('../constants/functions');
var operators = require('../constants/operators');
var labels = require('../constants/labels');
var combinators = require('../constants/combinators');
var properties = require('../constants/properties');
var datasetIdentifiers = require('../constants/DatasetIdentifiers');
var { setQuery } = require('../actions/ActionRuleBuilderActions');
import Condition from './Condition';
  
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

class ConditionWrapper extends React.Component {
  
  constructor(props) {
    super(props);
  }
  
  setActionPropertyA(ruleId, actionRuleId, propA){
    console.log(ruleId, actionRuleId, propA);
    //this.setState({propertyA:e});
  }

  setActionPropertyB(ruleId, actionRuleId, propB){
    console.log(ruleId, actionRuleId, propB);
    //this.setState({propertyA:e});
  }

  setDataset(ruleId, actionRuleId, dataset){
    console.log(ruleId, actionRuleId, dataset);
    //this.setState({propertyA:e});
  }

  setThreshold(ruleId, actionRuleId, thres){
    console.log(ruleId, actionRuleId, thres);
    //this.setState({propertyA:e});
  }

  render() {

    return (
      <Condition
        ruleId={this.props.options[0].ruleId}
        actionRuleId={this.props.options[0].actionRuleId}
        field={this.props.field}
        setActionPropertyA={this.setActionPropertyA}
        setActionPropertyB={this.setActionPropertyB}
        setDataset={this.setDataset}
        setThreshold={this.setThreshold}
      />
    )
  }
}

class ActionRuleBuilder extends React.Component {

  constructor(props) {
    super(props);
    this.logQuery = this.logQuery.bind(this);
    
    this.state = {
      field: 'isDateKnownFormat',
      actionRules: [],
      ind:{key:0},
      controlElements: {operatorSelector: ConditionWrapper, valueEditor: customValueEditor()}
    };
  }
  
  componentDidMount() {
    console.log(this);
  }

  logQuery(e){
    console.log(e);
    //TODO: add propA, propB, dataset, threshold to query from condition
    //define keys for each query-rule
    let field = e.rules[0] ? e.rules[0].field : this.state.field;
    this.setState({field:field});
    this.props.onChange(e, this.props.actionRuleId, this.props.ruleId);
  }
  
  render() {

    var ops = [{ruleId:this.props.ruleId, actionRuleId: this.props.actionRuleId}];

    return (
      <div className="query-builder"> 
        <QueryBuilder
          fields = {functions}
          translations = {labels}
          combinators = {combinators}
          operators={ops}
          controlElements = {this.state.controlElements}
          onQueryChange = {this.logQuery} 
        />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    query:state.query
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions : bindActionCreators(Object.assign({}, { setQuery }) , dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ActionRuleBuilder);