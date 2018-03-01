require('../RuleBox.scss');
const React = require('react');
const ReactDOM = require('react-dom');
var { bindActionCreators } = require('redux');
var { connect, Provider } = require('react-redux');

import QueryBuilder from 'react-querybuilder';
import ActionRuleBuilder from './actionRule-builder';
import Property from './property';
import fusionPropertyReducer from '../reducers/fusionProperty';


  
class RuleBuilder extends React.Component {

  constructor(props) {
    super(props);
  }
  
  componentWillMount(){
    console.log(this);
  }
  
  deleteRule(id) {

    var updatedRules = this.props.rules.filter(function( rule ) {
      return rule.id !== id;
    });

    this.setState({rules : updatedRules});
  }
  
  getRules(rules){
    var rulesView = rules.map(r => (
     <div key={r.id}>
      < div  className = "Rule" > 
        <div>
           <span style={{float: 'right'}}>
             <button className = "Button" type="button" onClick={e => this.deleteRule(r.id)}>Delete Rule</button> 
           </span>
        </div>
        <div >
          < Property / >
        </div>
        < div >
          < ActionRuleBuilder  />
        < /div>
      < /div >
    </div>)
    );
   
    return rulesView;
  }
  
  render() {

    return (
     <div>
      {this.getRules(this.props.rules)}
      </div>
    )
  }
}

RuleBuilder.defaultProps = {
  rules: []
}

function mapStateToProps(state) {
  return {
    rules: state.rules
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions : bindActionCreators(Object.assign({}, { }) , dispatch)
  };
}

//export default connect(mapStateToProps, mapDispatchToProps)(RuleBuilder);
export default RuleBuilder;
