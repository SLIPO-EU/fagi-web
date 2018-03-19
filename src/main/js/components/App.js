require('../RuleBox.scss');
const React = require('react');

import { connect } from 'react-redux';
import RuleBuilder from '../components/RuleBuilder';
import Chart from '../components/Chart';
var { bindActionCreators } = require('redux');
var datasetActionConstants = require('../constants/DatasetActionConstants');
var chartOption = require('../constants/ChartOptions');
var chartDefaultOption = require('../constants/ChartDefaultOptions');
var datasetActionConstants = require('../constants/DatasetActionConstants');
var { setDatasetAction, fuse, runStatistics } = require('../actions/AppActions');

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
    this.state = {
      success: null,
      error: null,
      showStatistics:false,
      loading: null,
      statistics: null      
    }
  }

  fuse(){
    //console.log(this);
    this.props.actions.fuse();
  }
  
  runStatistics(){
    console.log(this);
    
    this.setState({showStatistics:true});
    
    this.props.actions.runStatistics();
  }
  
  selectDatasetAction(e){
    this.props.actions.setDatasetAction(e);
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
            <button className = "FuseButton" type="button" onClick={e => this.runStatistics()}>Calculate Stats</button> 
           <button className = "FuseButton" type="button" onClick={e => this.fuse()}>Fuse</button> 
            < div className="SelectBox_content" > 
              <label>Default Dataset Action:&nbsp;&nbsp;</label>
            < /div >
          < div className="SelectBox_content" > 
            < select title = "Choose Default Dataset Fusion Action" 
              onChange={e => this.selectDatasetAction(e.target.value)}  >            
              {options}
            < /select>
          < /div >
          </div>
        </span>
          < div className='Chart'>
            <Chart 
              option={chartOption}
              defaultOption={chartDefaultOption}
              loading={this.state.loading}
              show={this.state.showStatistics}
              />
          < /div >
      < /div >
    )
  }
}

function mapStateToProps(state) {
  return {
    success: state.success,
    error: state.error,
    datasetAction: state.datasetAction,
    loading: state.loading,
    statistics: state.statistics
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions : bindActionCreators(Object.assign({}, { setDatasetAction, fuse, runStatistics }) , dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);