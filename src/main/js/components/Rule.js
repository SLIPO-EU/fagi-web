const React = require('react');
var { bindActionCreators } = require('redux');
var { connect} = require('react-redux');

import ActionRuleBuilder from './ActionRuleBuilder';
import FusionPropertyPair from './PropertyPair';

var fusionActionConstants = require('../constants/FusionActionConstants');

var { setRuleId, setFusionPropertyA, setFusionPropertyB } = require('../actions/RuleActions');

var ind = {key:0};

var options =  fusionActionConstants.map(function(action) {
  return (
   <option 
    key={action.key} 
    value ={action.value}>{action.label}</option>
  );
});

class Rule extends React.Component {

  constructor(props) {
    super(props);
    //bind selectProperty to be passed to FusionProperty
    this.selectPropertyA = this.selectPropertyA.bind(this);
    this.selectPropertyB = this.selectPropertyB.bind(this);

    this.props.actions.setRuleId(this.props.id);
    
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
  
  selectFusionAction(a){
    console.log(a);
    //this.props.actions.setFusionAction();
  }
  
  addActionRule(){
    console.log('add action rule');
    
    let index = this.state.ind.key + 1;
    var newActionRules = this.state.actionRules;
    newActionRules.push({id:(index)});

    this.setState({ind:{key:index}, actionRules : newActionRules});

    //this.props.actions.addRule({id:index});    
  }
  
  deleteActionRule(id) {
    console.log('delete action rule' + id);
    
//    var updatedActionRules = this.state.actionRules.filter(function( actionRule ) {
//      return actionRule.id !== id;
//    });
//
//    this.setState({actionRules : updatedActionRules});
//    this.props.actions.removeActionRule(id);

  }
  
  render() {
    console.log(this);
    
    var actionRuleComponents = this.state.actionRules.length > 0 ? (this.state.actionRules.map(r => (
      <div key={r.id} className="ActionRule">
          <div>
            <span style={{float: 'right'}}>
              <button type="button" onClick={e => this.deleteActionRule(this.props.id)}>x</button> 
            </span>
          </div>      
            < div className="ActionRuleBuilderBox">
              < ActionRuleBuilder 
                key={r.id} 
                id={r.id} />
            < /div>
            <div className="FusionActionPair" >
              <div className="RuleFusionActionBox">
                < div className="RuleSelectBox_content" > 
                  <label>Fusion Action:&nbsp;&nbsp;</label>
                < /div >
                < div className="RuleSelectBox_content" > 
                  < select title = "Choose Fusion Action" 
                    onChange={e => this.selectFusionAction(e.target.value)} >            
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
        < div  > 
          <div>
            <span style={{float: 'right'}}>
              <button className = "RuleButton" type="button" onClick={e => this.props.onDelete(this.props.id)}>Delete Rule</button> 
            </span>
          </div>
         <div >
          <div >
            < FusionPropertyPair 
              onSelectA={this.selectPropertyA}
              onSelectB={this.selectPropertyB}
            / >
          </div>
          <div className="RuleSelectBox">
            < div className="RuleSelectBox_content" > 
              <label>Default Rule Action:&nbsp;&nbsp;</label>
            < /div >
            < div className="RuleSelectBox_content" > 
              < select title = "Choose Default Action" 
                onChange={e => this.selectFusionAction(e.target.value)} >
                {options}
              < /select>
            < /div >
          </div>
       </div>     
      {actionRuleComponents}
          <div>
            <button className = "ConditionButton" type="button" onClick={e => this.addActionRule()}>Add Condition</button> 
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
    rule: state.fusionPropertyB
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions : bindActionCreators(Object.assign({}, { setRuleId, setFusionPropertyA, setFusionPropertyB }) , dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Rule);
