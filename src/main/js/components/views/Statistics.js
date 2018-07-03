const React = require('react');

import { connect } from 'react-redux';
import Chart from './Chart';

var { bindActionCreators } = require('redux');
var chartOption = require('../../constants/ChartOptions');
var chartDefaultOption = require('../../constants/ChartDefaultOptions');
var { runStatistics } = require('../../actions/StatisticsActions');
  
class Statistics extends React.Component {

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

  runStatistics(){
    this.setState({showStatistics:true});

    this.props.actions.runStatistics();
  }

  render() {
    return (
      <div>
        <div className="Logo"> 
          <div align="center"> FAGI </div>
        </div>
        <span style={{float: 'right'}}>
          <div className = "FusionBox">
            <button className = "FuseButton" type="button" onClick={e => this.runStatistics()}>Calculate Stats</button>
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
  return {
    success: state.success,
    error: state.error,
    statistics: state.statistics,
    loading: state.statistics.loading
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions : bindActionCreators(Object.assign({}, { runStatistics }) , dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Statistics);