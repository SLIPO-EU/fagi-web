const React = require('react');
var { bindActionCreators } = require('redux');
var { connect } = require('react-redux');
import Rule from './Rule';

var { addRule, removeRule } = require('../actions/RuleBuilderActions');

//begin with a default zero rule index
var ind = {key:0};

class RuleBuilder extends React.Component {

  constructor(props) {
    super(props);

    //bind delete handler to be passed to 'Rule'
    this.deleteRule = this.deleteRule.bind(this)

    this.state = {
        rules: [],
        update:false
    };
  }
  
  addRule() {
    ind.key++;
    var newRules = this.state.rules;
    newRules.push({id:ind.key, fusionPropertyA:null, fusionPropertyB:null});

    this.setState({rules : newRules});
    this.props.actions.addRule({id:ind.key});

  }
  
  deleteRule(id) {

    var updatedRules = this.state.rules.filter(function( rule ) {
      return rule.id !== id;
    });

    this.setState({rules : updatedRules, update:!this.state.update});
    this.props.actions.removeRule(id);

  }
  

  shouldComponentUpdate(nextProps, nextState) {
    return true;
  } 
  
  render() {

      var ruleComponents = this.state.rules.length > 0 ? (this.state.rules.map(r => (
              <Rule 
                updateRules={this.state.update}
                key={r.id} 
                id={r.id}
                onDelete={this.deleteRule}/>))) : null;  

    return (
      <div>
        <div>
          <button className = "Button" type="button" onClick={e => this.addRule()}>Add Rule</button> 
        </div>
        <div>
          {ruleComponents}
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
