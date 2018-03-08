require('../RuleBox.scss');
const React = require('react');

import { connect } from 'react-redux';
import RuleBuilder from '../components/RuleBuilder';
import Chart from '../components/Chart';
var { bindActionCreators } = require('redux');
var datasetActionConstants = require('../constants/DatasetActionConstants');
var { fuse } = require('../actions/AppActions');

var barGaps = ['30%', '-100%'];
var loopIndex = 0;

var options =  datasetActionConstants.map(function(action) {
  return (
   <option 
    key={action.key} 
    value ={action.value}>{action.label}</option>
  );
});
  
class App extends React.Component {

  constructor(props) {
    super(props);
  }

  fuse(){
    console.log(this);
    this.props.actions.fuse();
  }

  render() {
    return (
      < div > 
        < div className="Logo" > 
          < div align="center"> FAGI < /div >
        < /div >
        <div >
          < RuleBuilder /> 
        </div>
        <span style={{float: 'right'}}>
          <div className = "FusionBox">
            <button  className = "FuseButton" type="button" onClick={e => this.fuse()}>Fuse</button> 
            < div className="SelectBox_content" > 
              <label>Default Dataset Action:&nbsp;&nbsp;</label>
            < /div >
          < div className="SelectBox_content" > 
            < select title = "Choose Default Dataset Fusion Action" 
              onChange={e => this.selectFusionAction(e.target.value)}  >            
              {options}
            < /select>
          < /div >
          </div> 
        </span>
          < div >
            <Chart 
              />
          < /div >
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