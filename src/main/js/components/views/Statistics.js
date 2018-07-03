const React = require('react');

import { connect } from 'react-redux';
import Chart from './Chart';

var { bindActionCreators } = require('redux');
var chartOption = require('../../constants/ChartOptions');
var chartDefaultOption = require('../../constants/ChartDefaultOptions');
var { runStatistics } = require('../../actions/StatisticsActions');
import Table from './Table';
import Checkbox from './Checkbox';
  
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
    var data = [
      {
        key: 1,
        selected: {value: false, text: 'text1'},
        name: 'stat1',
        description: 'stat1 description',
        count: 30,
        linked: 'no'
      },  
      {
        id: 2,
        selected: {value: true, text: 'text2'},
        name: 'stat2',
        description: 'stat2 description',
        count: 30,
        linked: 'yes'
      }
    ];
  
    var columns = [
      {
        Header: 'Key',
        accessor: 'key',
        show: false
      },      
      {
        Header: 'Selected',
        accessor: 'selected',
        show: true,
        Cell: props => {
          return (
            <Checkbox value={true} label={'test checkbox'} help={'select'} text={'#stat'}/>
          );
        }
      }, {
        Header: 'Name',
        accessor: 'name',
        show: true
      },{
        Header: 'Description',
        accessor: 'description',
        show: true
      }, {
        Header: 'Linked',
        accessor: 'linked',
        show: true
      }];
  
    return (
      <div>
        <div>
          <Table
            data={data}
            columns={columns}
            minRows={5}
            showPagination={true}
          />
        </div>
        <div>
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