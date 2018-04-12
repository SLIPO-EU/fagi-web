require('../RuleBox.scss');
const React = require('react');
import MDSpinner from "react-md-spinner";
import { connect } from 'react-redux';
import RuleSet from '../components/RuleSet';
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
      statistics: null,
      datasetAction: datasetActionConstants[0]
    }
  }

  fuse(){
    console.log('fuse');
    console.log(this.props.config);
    this.props.actions.fuse(this.props.config);
  }
  
  runStatistics(){
    this.setState({showStatistics:true});

    this.props.actions.runStatistics();
  }

  selectDatasetAction(e){
    //this.setState({datasetAction:e});
    this.props.actions.setDatasetAction(e);
  }

  render() {

    if(this.props.calculating){
      return(
        <div className="centered">
          <MDSpinner 
            duration={4000} 
            size={80}
          />
        </div>
      );
    }

    return (
      <div> 
        <div className="Logo"> 
          <div align="center"> FAGI </div>
        </div>
        <div >
          < RuleSet /> 
        </div>
        <span style={{float: 'right'}}>
          <div className = "FusionBox">
            <button className = "FuseButton" type="button" onClick={e => this.runStatistics()}>Calculate Stats</button> 
            <button className = "FuseButton" type="button" onClick={e => this.fuse()}>Fuse</button> 
            <div className="SelectBox_content"> 
              <label>Default Dataset Action:&nbsp;&nbsp;</label>
            </div>
          <div className="SelectBox_content"> 
            <select title = "Choose Default Dataset Fusion Action" 
              onChange={e => this.selectDatasetAction(e.target.value)}>            
              {options}
            </select>
          </div>
        </div>
        </span>
          <div className='Chart'>
            <Chart 
              option={chartOption}
              defaultOption={chartDefaultOption}
              loading={this.state.loading}
              show={this.state.showStatistics}
              />
          </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  
  let config = {validationRules : state.validation, ruleset : state.ruleset};
  
  return {
    success: state.success,
    error: state.error,
    datasetAction: state.datasetAction,
    loading: state.app.loading,
    calculating: state.app.calculating,
    statistics: state.statistics,
    config: config
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions : bindActionCreators(Object.assign({}, { setDatasetAction, fuse, runStatistics }) , dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);