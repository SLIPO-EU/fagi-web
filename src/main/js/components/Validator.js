const React = require('react');
var { bindActionCreators } = require('redux');
var { connect} = require('react-redux');

import ValidationRuleBuilder from './ActionRuleBuilder';

var validationActionConstants = require('../constants/ValidationActionConstants');

var options =  validationActionConstants.map(function(action) {
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
    var newValidationRules = this.state.validationRules;
    newValidationRules.push({id:(index)});

    this.setState({ind:{key:index}, validationRules : newValidationRules});
    this.props.actions.addActionRule({id:index});
  }
  
  deleteValidationRule(id) {

  }
  
  render() {

    var validationRuleComponents = this.state.validationRules.length > 0 ? (this.state.validationRules.map(r => (
      <div key={r.id} className="ActionRule">
          <div>
            <span style={{float: 'right'}}>
              <button type="button" onClick={e => this.deleteValidationRule(this.props.id)}>x</button> 
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
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions : bindActionCreators(Object.assign({}, { }) , dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Validator);
