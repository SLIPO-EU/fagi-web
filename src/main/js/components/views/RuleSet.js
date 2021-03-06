const React = require('react');
var { bindActionCreators } = require('redux');
var { connect } = require('react-redux');
import Rule from './Rule';
import Validator from './Validator';

var { addRule, removeRule, updateActionRules } = require('../../actions/RuleSetActions');

class RuleSet extends React.Component {

  constructor(props) {
    super(props);

    //bind delete handler to be passed to 'Rule'
    this.deleteRule = this.deleteRule.bind(this);
    this.updateActionRules = this.updateActionRules.bind(this);
    this.changeFusionAction = this.changeFusionAction.bind(this);

    this.state = {
      rules: [],
      ind:{key:0}
    };
  }

  addRule() {

    let index = this.state.ind.key + 1;
    
    var newRules = this.state.rules;
    newRules.push({id:(index), fusionPropertyA:null, fusionPropertyB:null});

    this.setState({ind:{key:index}, rules : newRules});

    this.props.actions.addRule({id:index});
  }
  
  deleteRule(id) {

    var updatedRules = this.state.rules.filter(function( rule ) {
      return rule.id !== id;
    });

    this.setState({rules : updatedRules});
    this.props.actions.removeRule(id);

  }
  
  updateActionRules(ruleId, actionRuleId, query) {
    this.props.actions.updateActionRules(ruleId, actionRuleId, query);
  }
  
  changeFusionAction(ruleId, actionRuleId, fusionAction) {
    this.props.actions.changeFusionAction(ruleId, actionRuleId, fusionAction);
  }  
  
  render() {

    var validationComponent;

    var ruleComponents = this.state.rules.length > 0 ? (this.state.rules.map(r => (
      <Rule 
        key={r.id} 
        id={r.id}
        updateActionRule={this.updateActionRules}
        changeFusionAction={this.changeFusionAction}
        onDelete={this.deleteRule}
      />))) : null;

    return (
      <div>
        <div>
          <div className="breadcrumb-item">
            <label>Validation rules</label>
          </div>
          <ColoredLine color="#263238"/>
          <Validator />
        </div>
          <div>
            <div className="breadcrumb-item">
              <label>Fusion rules</label>
            </div>
          <ColoredLine color="#263238"/>
          <button className = "fagi-button-green" type="button" onClick={e => this.addRule()}>Add New Ruleset</button> 
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
    actions : bindActionCreators(Object.assign({}, { addRule, removeRule, updateActionRules }) , dispatch)
  };
}

const ColoredLine = ({ color }) => (
    <hr
        style={{
            color: color,
            backgroundColor: color,
            height: 1
        }}
    />
);

export default connect(mapStateToProps, mapDispatchToProps)(RuleSet);
