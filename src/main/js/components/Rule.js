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
  
  shouldComponentUpdate(nextProps, nextState) {
    return true;
  }   
  
  componentWillReceiveProps(nextProps){
    console.log(nextProps);
  }

  selectPropertyA(e){
    this.props.actions.setFusionPropertyA(this.props.id, e);
  }

  selectPropertyB(e){
    this.props.actions.setFusionPropertyB(this.props.id, e);
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
