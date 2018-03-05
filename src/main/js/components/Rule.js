const React = require('react');
var { bindActionCreators } = require('redux');
var { connect} = require('react-redux');

import ActionRuleBuilder from './ActionRuleBuilder';
import FusionPropertyPair from './PropertyPair';

var fusionActionConstants = require('../constants/FusionActionConstants');

var { setRuleId, setFusionPropertyA, setFusionPropertyB } = require('../actions/RuleActions');

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
    //bind delete handler to be passed to 'Rule'
    this.selectPropertyA = this.selectPropertyA.bind(this);
    this.selectPropertyB = this.selectPropertyB.bind(this);

    this.props.actions.setRuleId(this.props.id);

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
          < ActionRuleBuilder
            
          />
        < /div>
        <div className="PropertyBox">
          < div className="PropertyBox_content" > 
            <label>Fusion Action:&nbsp;&nbsp;</label>
          < /div >
          < div className="PropertyBox_content" > 
            < select title = "Choose Fusion Action" 
              onChange={e => this.selectFusionAction(e.target.value)}  >            
              {options}
            < /select>
          < /div >
        </div>     
      < /div >
    </div>);
    
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
