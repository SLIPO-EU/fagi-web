require('../RuleBox.scss');
const React = require('react');
import MDSpinner from "react-md-spinner";
import { connect } from 'react-redux';
import RuleSet from '../components/RuleSet';
import Chart from '../components/Chart';
import Configuration from '../components/Configuration';

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
    
    this.props.actions.setDatasetAction(datasetActionConstants[0].name);
  }

  fuse(){
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

    let loading;
    if(this.props.calculating){
      loading = (
        <div className="centered">
          <MDSpinner 
            duration={4000} 
            size={80}
          />
        </div>
      );
    } else {
      loading = null;
    }

    let ontologyReady = false;
    return (
      ontologyReady ? 
        (
          <div >
            <div className="Logo"> 
              <div align="center"> Configuration </div>
            </div>
            <div>
              <Configuration />
            </div>
          </div>
        ) :

      (
      <div> 
        {loading}
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
    ))
  }
}

function mapStateToProps(state) {

  let config = {datasetAction: state.app.datasetAction, validationRules: state.validator, ruleset: state.ruleset};
  
  return {
    success: state.success,
    error: state.error,
    datasetAction: state.app.datasetAction,
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