const React = require('react');
var { bindActionCreators } = require('redux');
var { connect} = require('react-redux');

import ValidationRuleBuilder from './ActionRuleBuilder';

var validatorActionConstants = require('../constants/ValidatorActionConstants');
var { addValidationRule, removeValidationRule } = require('../actions/ValidatorActions');

var options =  validatorActionConstants.map(function(action) {
  return (
   <option 
    key={action.key} 
    value ={action.value}>{action.label}</option>
  );
});

class Validator extends React.Component {

  constructor(props) {
    super(props);
    
    this.state = {
      validationRules: [],
      ind:{key:0}
    };
  }
  
  selectValidationAction(a){
    console.log(a);
  }
  
  addValidationRule(){
    let index = this.state.ind.key + 1;
    var newActionRules = this.state.validationRules;
    newActionRules.push({id:(index)});

    this.setState({ind:{key:index}, validationRules : newActionRules});

    this.props.actions.addValidationRule(index); 
  }
  
  deleteValidationRule(id) {

    var updatedActionRules = this.state.validationRules.filter(function( actionRule ) {
      return actionRule.id !== id;
    });

    this.setState({validationRules : updatedActionRules});
    this.props.actions.removeValidationRule(id);
  }
  
  render() {

    var validationRuleComponents = this.state.validationRules.length > 0 ? (this.state.validationRules.map(r => (
      <div key={r.id} className="ActionRule">
          <div>
            <span style={{float: 'right'}}>
              <button type="button" onClick={e => this.deleteValidationRule(r.id)}>x</button> 
            </span>
          </div>        
            < div className="ActionRuleBuilderBox">
              < ValidationRuleBuilder 
                key={r.id} 
                id={r.id} />
            < /div>
            <div className="FusionActionPair" >
              <div className="RuleFusionActionBox">
                < div className="RuleSelectBox_content" > 
                  <label>Validation Action:&nbsp;&nbsp;</label>
                < /div >
                < div className="RuleSelectBox_content" > 
                  < select title = "Choose Validation Action" 
                    onChange={e => this.selectValidationAction(e.target.value)} >            
                    {options}
                  < /select>
                < /div >
              </div>
            </div>
          < /div>
          )
        )
      ) : null;    

    return (
      <div className = "RuleWrapper" key={this.props.id} >
        < div >
         <div >
          <div className="RuleSelectBox">
            < div className="RuleSelectBox_content" > 
              <label>Default Validation Action:&nbsp;&nbsp;</label>
            < /div >
            < div className="RuleSelectBox_content" > 
              < select title = "Choose Default Action" 
                onChange={e => this.selectValidationAction(e.target.value)} >
                {options}
              < /select>
            < /div >
          </div>
       </div>     
      {validationRuleComponents}
          <div>
            <button className = "ConditionButton" type="button" onClick={e => this.addValidationRule()}>Add Validation Rule</button> 
          </div>
        < /div >
      </div>
    );
    
  }
}

function mapStateToProps(state) {

  return {
    rules: state.rules
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions : bindActionCreators(Object.assign({}, { addValidationRule, removeValidationRule }) , dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Validator);
