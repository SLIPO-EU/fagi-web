const React = require('react');
var { bindActionCreators } = require('redux');
var { connect} = require('react-redux');

import ActionRuleBuilder from './ActionRuleBuilder';

var validatorActionConstants = require('../../constants/ValidatorActionConstants');
var { addValidationRule, removeValidationRule, updateActionRules, setDefaultValidationAction, 
      selectValidationAction } = require('../../actions/ValidatorActions');

var options =  validatorActionConstants.map(function(action) {
  return (
    <option 
      key={action.key} 
      value ={action.value}>{action.label}
    </option>
  );
});

class Validator extends React.Component {

  constructor(props) {
    super(props);
    
    this.updateActionRules = this.updateActionRules.bind(this);
    this.selectValidationAction = this.selectValidationAction.bind(this);
    
    this.props.actions.setDefaultValidationAction(validatorActionConstants[0].name);
    
    this.state = {
      validationRules: [],
      ind:{key:0}
    };
  }
  
  setDefaultValidationAction(e){
    this.props.actions.setDefaultValidationAction(e);
  }
  
  selectValidationAction(actionRuleId, validationAction){
    this.props.actions.selectValidationAction(actionRuleId, validationAction);
  }
  
  addValidationRule(){
    
    let index = this.state.ind.key + 1;
    
    var newValidationRules = this.state.validationRules;
    newValidationRules.push({id:(index)});

    this.setState({ind:{key:index}, validationRules : newValidationRules});

    this.props.actions.addValidationRule(index); 
  }
  
  deleteValidationRule(id) {

    var updatedValidationRules = this.state.validationRules.filter(function( validationRule ) {
      return validationRule.id !== id;
    });

    this.setState({validationRules : updatedValidationRules});
    this.props.actions.removeValidationRule(id);
  }

  updateActionRules(query, actionRuleId, ruleId) {
    //ignoring ruleId, There is only one rule in validation.
    this.props.actions.updateActionRules(actionRuleId, query);
  }
  
  render() {

    var validationRuleComponents = this.state.validationRules.length > 0 ? (this.state.validationRules.map(r => (
      <div key={r.id} className="ActionRule">
          <div>
            <span style={{float: 'right'}}>
              <button className = "fagi-button-close" type="button" onClick={e => this.deleteValidationRule(r.id)}>Clear</button> 
            </span>
          </div>
            <div className="ActionRuleBuilderBox">
              <ActionRuleBuilder 
                ontology={this.props.ontology}
                key={this.props.id}
                ruleId={this.props.id}
                actionRuleId={r.id}
                onChange={this.updateActionRules}
              />
            </div>
            <div className="FusionActionPair" >
              <div className="RuleFusionActionBox">
                <div className="RuleSelectBox_content"> 
                  <label>Validation Action:&nbsp;&nbsp;</label>
                </div>
                <div className="RuleSelectBox_content" > 
                  <select className="simple-select" title = "Choose Validation Action" 
                    onChange={e => this.selectValidationAction(r.id, e.target.value)}>            
                    {options}
                  </select>
                </div>
              </div>
            </div>
          </div>
          )
        )
      ) : null;    

    return (
      <div className = "RuleWrapper" key={this.props.id} >
        <div>
          <div>
            <div className="validation-box">
              <div className="RuleSelectBox_content" > 
                <label>Default Validation Action:&nbsp;&nbsp;</label>
              </div>
              <div className="RuleSelectBox_content"> 
                <select className="simple-select" title = "Choose Default Action" 
                  onChange={e => this.setDefaultValidationAction(e.target.value)}>
                  {options}
                </select>
              </div>
            </div>
          </div>
          {validationRuleComponents}
          <div className = "ButtonWrapper">
            <button className = "fagi-button-green" type="button" onClick={e => this.addValidationRule()}>Add Validation Rule</button> 
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    rules: state.validator.rules,
    ontology: state.configuration.ontology
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions : bindActionCreators(Object.assign({}, { addValidationRule, removeValidationRule, 
                                                     updateActionRules, setDefaultValidationAction, 
                                                     selectValidationAction }) , dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Validator);
