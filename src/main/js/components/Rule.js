const React = require('react');
var { bindActionCreators } = require('redux');
var { connect} = require('react-redux');

import ActionRuleBuilder from './ActionRuleBuilder';
import FusionPropertyPair from './PropertyPair';

var { setRuleId, setFusionPropertyA, setFusionPropertyB } = require('../actions/RuleActions');

class Rule extends React.Component {

  constructor(props) {
    super(props);
    //bind delete handler to be passed to 'Rule'
    this.selectPropertyA = this.selectPropertyA.bind(this);
    this.selectPropertyB = this.selectPropertyB.bind(this);

    this.props.actions.setRuleId(this.props.id);

  }
  
  selectPropertyA(e){
    console.log(e);
    this.props.actions.setFusionPropertyA(e);
  }

  selectPropertyB(e){
    console.log(e);
    this.props.actions.setFusionPropertyB(e);
  }
  
  render() {

    return (
     <div key={this.props.id}>
      < div  className = "Rule" > 
        <div>
           <span style={{float: 'right'}}>
             <button className = "Button" type="button" onClick={e => this.props.onDelete(this.props.id)}>Delete Rule</button> 
           </span>
        </div>
        <div >
          < FusionPropertyPair 
              onSelectA={this.selectPropertyA}
              onSelectB={this.selectPropertyB}
          / >
        </div>
        < div >
          < ActionRuleBuilder  />
        < /div>
      < /div >
    </div>);
    
  }
}

function mapStateToProps(state) {

  var lala = [];
  var newRule = {};
  newRule.id = state.rule.id;
  newRule.fusionPropertyA = state.rule.fusionPropertyA;
  newRule.fusionPropertyB = state.rule.fusionPropertyB;

   //replace in rules by current id.
   if(state.rule.id){
     var objIndex = state.ruleBuilder.rules.findIndex((obj => obj.id == state.rule.id));

     objIndex !==-1 ? state.ruleBuilder.rules[objIndex] = newRule : state.ruleBuilder.rules.push(newRule);
   }

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
