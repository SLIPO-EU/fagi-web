require('../RuleBox.scss');
const React = require('react');
const ReactDOM = require('react-dom');
var { bindActionCreators } = require('redux');
var { connect, Provider } = require('react-redux');

import QueryBuilder from 'react-querybuilder';
import ActionRuleBuilder from './ActionRuleBuilder';
import Property from './property';
import fusionPropertyReducer from '../reducers/fusionProperty';

var { addRule, removeRule } = require('../actions/RuleBuilderActions');

var ind = {key:0};

class RuleBuilder extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
        rules: [{id:0}]
    };

  }
  
  addRule(e) {
    ind.key++;
    var newRules = this.state.rules;
    newRules.push({id:ind.key});

    this.setState({rules : newRules});

  }  
  deleteRule(id) {
    var updatedRules = this.state.rules.filter(function( rule ) {
      return rule.id !== id;
    });

    this.setState({rules : updatedRules});
  }
  
  getRules(rules){
    var rulesView = rules.map(r => (
     <div key={r.id}>
      < div  className = "Rule" > 
        <div>
           <span style={{float: 'right'}}>
             <button className = "Button" type="button" onClick={e => this.deleteRule(r.id)}>Delete Rule</button> 
           </span>
        </div>
        <div >
          < Property / >
        </div>
        < div >
          < ActionRuleBuilder  />
        < /div>
      < /div >
    </div>)
    );
   
    return rulesView;
  }
  
  render() {
    
    var showRules = this.state ?  this.getRules(this.state.rules) : [];
    return (
     <div>
        <div>
          <button className = "Button" type="button" onClick={e => this.addRule()}>Add Rule</button> 
        </div>
     
     <div>
      {showRules}
      </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    rules: state.rules
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions : bindActionCreators(Object.assign({}, { addRule, removeRule }) , dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(RuleBuilder);
