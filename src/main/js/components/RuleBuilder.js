const React = require('react');
var { bindActionCreators } = require('redux');
var { connect } = require('react-redux');
import Rule from './Rule';

var { addRule, removeRule } = require('../actions/RuleBuilderActions');

//begin with a default zero rule index
var ind = {key:0};

class RuleBuilder extends React.Component {

  constructor(props) {
    super(props);

    //bind delete handler to be passed to 'Rule'
    this.deleteRule = this.deleteRule.bind(this)

    this.state = {
        rules: [{id:0}]
    };
  }
  
  addRule(e) {
    ind.key++;
    var newRules = this.state.rules;
    newRules.push({id:ind.key});

    this.setState({rules : newRules});

  }  
  deleteRule(id) {
    var updatedRules = this.state.rules.filter(function( rule ) {
      return rule.id !== id;
    });

    this.setState({rules : updatedRules});
  }
   
  render() {

    return (
      <div>
        <div>
          <button className = "Button" type="button" onClick={e => this.addRule()}>Add Rule</button> 
        </div>
        <div>
          {this.state.rules.map(r => (
            <Rule 
              key={r.id} 
              id={r.id}
              onDelete={this.deleteRule}/>
            ))}
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    rules: state.rules
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions : bindActionCreators(Object.assign({}, { addRule, removeRule }) , dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(RuleBuilder);
