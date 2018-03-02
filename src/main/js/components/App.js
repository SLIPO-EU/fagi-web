require('../RuleBox.scss');
const React = require('react');
const ReactDOM = require('react-dom');

import { Provider, connect } from 'react-redux';
var { bindActionCreators } = require('redux');

import QueryBuilder from 'react-querybuilder';
import ActionRuleBuilder from '../components/ActionRuleBuilder';
import RuleBuilder from '../components/RuleBuilder';
import Property from '../components/property';
import fusionPropertyReducer from '../reducers/fusionProperty';

var { fuse } = require('../actions/AppActions');

var ind = {key:0};

class App extends React.Component {

  constructor(props) {
    super(props);
  }
  
  componentWillMount(){
    var rules = [{id:0}];
    this.setState({rules : rules});    
  }

  render() {
    return (
      < div > 
        < div className="RuleBox" > 
          < div align="center"> FAGI < /div >
        < /div >
        <div >
          < RuleBuilder
          /> 
        </div>
      < /div >
    )
  }
}
function mapStateToProps(state) {
  return {
    success: state.success,
    error: state.error
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions : bindActionCreators(Object.assign({}, { fuse }) , dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);