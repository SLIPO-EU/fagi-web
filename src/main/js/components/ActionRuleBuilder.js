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
import condition from './Condition';
  
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

class ActionRuleBuilder extends React.Component {

  constructor(props) {
    super(props);
    this.logQuery = this.logQuery.bind(this);

    this.state = {
      actionRules: [],
      ind:{key:0},
      controlElements: {operatorSelector: condition, valueEditor: customValueEditor()}
    };
  }

  componentWillMount() {

  }

  componentDidMount() {
    console.log(this);
  }

  logQuery(e){
    this.props.onChange(e, this.props.actionRuleId, this.props.ruleId);
  }  

  render() {
    var ops = [{name:{op1:'prop1'}, label:'propA'}];
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