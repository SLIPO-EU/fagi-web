require('../RuleBox.scss');
const React = require('react');

import { connect } from 'react-redux';
var { bindActionCreators } = require('redux');

import RuleBuilder from '../components/RuleBuilder';
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

  fuse(){
    console.log('fuse');
  }
  
  render() {
    return (
      < div > 
        < div className="RuleBox" > 
          < div align="center"> FAGI < /div >
        < /div >
        <div >
          < RuleBuilder /> 
        </div>
        <div>
           <span style={{float: 'right'}}>
             <button className = "Button" type="button" onClick={this.fuse}>Fuse</button> 
           </span>
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