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
    this.setDataset = this.setDataset.bind(this);
    this.setActionPropertyA = this.setActionPropertyA.bind(this);
    this.setActionPropertyB = this.setActionPropertyB.bind(this);
    this.setThreshold = this.setThreshold.bind(this);
  }
  
  componentDidMount() {
    this.props.handleOnChange({dataset:datasetIdentifiers[0].name, propA:properties[0], propB:properties[0], threshold:0});
  }
  
  setActionPropertyA(ruleId, actionRuleId, propA){
    let _query = Object.assign(this.props.value, {propA:propA});
    this.props.handleOnChange(_query);  
  }

  setActionPropertyB(ruleId, actionRuleId, propB){
    let _query = Object.assign(this.props.value, {propB:propB});
    this.props.handleOnChange(_query);    
  }

  setDataset(ruleId, actionRuleId, dataset){
    let _query = Object.assign(this.props.value, {dataset:dataset});
    this.props.handleOnChange(_query);
  }

  setThreshold(ruleId, actionRuleId, thres){
    let _query = Object.assign(this.props.value, {threshold:thres});
    this.props.handleOnChange(_query);  
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

  logQuery(e){
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