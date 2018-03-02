const React = require('react');
var { bindActionCreators } = require('redux');
var { connect} = require('react-redux');

import ActionRuleBuilder from './ActionRuleBuilder';
import PropertyPair from './PropertyPair';

var { setFusionPropertyA, setFusionPropertyB } = require('../actions/RuleActions');

class Rule extends React.Component {

  constructor(props) {
    super(props);
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
          < PropertyPair / >
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
    actions : bindActionCreators(Object.assign({}, { setFusionPropertyA, setFusionPropertyB }) , dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Rule);
