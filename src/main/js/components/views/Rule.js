const React = require('react');
var { bindActionCreators } = require('redux');
var { connect} = require('react-redux');

import ActionRuleBuilder from './ActionRuleBuilder';
import FusionPropertyPair from './PropertyPair';

var fusionActionConstants = require('../../constants/FusionActionConstants');

var { setRuleId, changeFusionAction, setDefaultFusionAction, setFusionPropertyA, setFusionPropertyB, 
      addActionRule, removeActionRule } = require('../../actions/RuleActions');

var options =  fusionActionConstants.map(function(action) {
  return (
    <option 
      key={action.key} 
      value ={action.value}
      >
      {action.label}
    </option>
  );
});

class Rule extends React.Component {

  constructor(props) {
    super(props);

    //bind selectProperty to be passed to FusionProperty
    this.selectPropertyA = this.selectPropertyA.bind(this);
    this.selectPropertyB = this.selectPropertyB.bind(this);
    this.updateActionRule = this.updateActionRule.bind(this);
    this.changeFusionAction = this.changeFusionAction.bind(this);

    this.props.actions.setRuleId(this.props.id);
    
    this.props.actions.setDefaultFusionAction(this.props.id, fusionActionConstants[0].name);
    
    this.state = {
      actionRules: [],
      ind:{key:0}
    };

  }

  selectPropertyA(e){
    this.props.actions.setFusionPropertyA(this.props.id, e);
  }

  selectPropertyB(e){
    this.props.actions.setFusionPropertyB(this.props.id, e);
  }
  
  selectDefaultFusionAction(e){
    this.props.actions.setDefaultFusionAction(this.props.id, e);
  }
  
  addActionRule(){

    let index = this.state.ind.key + 1;
    var newActionRules = this.state.actionRules;
    newActionRules.push({id:(index)});

    this.setState({ind:{key:index}, actionRules : newActionRules});

    this.props.actions.addActionRule(this.props.id, index); 
  }

  deleteActionRule(id) {

    var updatedActionRules = this.state.actionRules.filter(function( actionRule ) {
      return actionRule.id !== id;
    });

    this.setState({actionRules : updatedActionRules});
    this.props.actions.removeActionRule(this.props.id, id);

  }

  updateActionRule(query, actionRuleId, ruleId){
    this.props.updateActionRule(ruleId, actionRuleId, query);
  }

  changeFusionAction(fusionAction, actionRuleId){
    this.props.actions.changeFusionAction(this.props.id, actionRuleId, fusionAction);
  }
  
  render() {

    var actionRuleComponents = this.state.actionRules.length > 0 ? (this.state.actionRules.map(r => (
      <div key={r.id} className="ActionRule">
          <div>
            <span style={{float: 'right'}}>
              <button type="button" onClick={e => this.deleteActionRule(r.id)}>x</button> 
            </span>
          </div>
            <div className="ActionRuleBuilderBox">
              < ActionRuleBuilder 
                key={this.props.id}
                ruleId={this.props.id}
                actionRuleId={r.id}
                onChange={this.updateActionRule}
              />
            </div>
            <div className="FusionActionPair">
              <div className="RuleFusionActionBox">
                <div className="RuleSelectBox_content"> 
                  <label>Fusion Action:&nbsp;&nbsp;</label>
                </div>
                <div className="RuleSelectBox_content" > 
                  <select title = "Choose Fusion Action" 
                    onChange={e => this.changeFusionAction(e.target.value, r.id)}
                  >            
                  {options}
                  </select>
                </div >
              </div>
            </div>
          </div>
          )
        )
      ) : null;

    return (
      <div className = "RuleWrapper" key={this.props.id} >
        < div  > 
          <div>
            <span style={{float: 'right'}}>
              <button className = "RuleButton" type="button" onClick={e => this.props.onDelete(this.props.id)}>Delete Rule</button> 
            </span>
          </div>
          <div>
            <div>
              <FusionPropertyPair 
                onSelectA={this.selectPropertyA}
                onSelectB={this.selectPropertyB}
              />
            </div>
            <div className="RuleSelectBox">
              < div className="RuleSelectBox_content" > 
                <label>Default Rule Action:&nbsp;&nbsp;</label>
              < /div >
              < div className="RuleSelectBox_content" > 
                < select title = "Choose Default Action" 
                  onChange={e => this.selectDefaultFusionAction(e.target.value)} >
                  {options}
                < /select>
              < /div >
            </div>
          </div>
          {actionRuleComponents}
          <div>
            <button className = "ConditionButton" type="button" onClick={e => this.addActionRule()}>Add Fusion Rule</button> 
          </div>
        < /div >
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    rule: state.id,
    rule: state.fusionPropertyA,
    rule: state.fusionPropertyB,
    rule: state.actionRules
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions : bindActionCreators(Object.assign({}, { setRuleId, changeFusionAction, setDefaultFusionAction, 
                                                     setFusionPropertyA, setFusionPropertyB, addActionRule, 
                                                     removeActionRule }) , dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Rule);
