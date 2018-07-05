const React = require('react');
var _ = require('lodash');
import { connect } from 'react-redux';
var { bindActionCreators } = require('redux');
var chartOption = require('../../constants/ChartOptions');
var chartDefaultOption = require('../../constants/ChartDefaultOptions');
var { runStatistics, runSelectedStatistics } = require('../../actions/StatisticsActions');
import Chart from './Chart';
import Table from './Table';
import Checkbox from './Checkbox';

function makeData() {
  return [
    {
      key: 'totalPois',
      name: "Total POIs",
      description: "Number of POI entities in each input dataset."
    },
    {
      key: 'totalTriples',
      name: "Total Triples",
      description: "Total number of triples in each input dataset."
    },
    {
      key: 'stat3',
      name: "stat3",
      description: "description3"
    },
    {
      key: 'stat4',
      name: "stat4",
      description: "description4"
    },
    {
      key: 'stat5',
      name: "stat5",
      description: "description5"
    },
    {
      key: 'stat6',
      name: "stat6",
      description: "description6"
    }
  ];
}

class Statistics extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      success: null,
      error: null,
      showStatistics:false,
      loading: null,
      statistics: null,
      selected: {}, 
      selectAll: 0, 
      data: makeData()
    }
    this.toggleRow = this.toggleRow.bind(this);
  }

  runStatistics(){
    this.setState({showStatistics:true});
    this.props.actions.runStatistics();
  }

  runSelectedStatistics(){

    var filtered = _.pickBy(this.state.selected);
    let stats = Object.keys(filtered);
    let request = {statistics: stats, configPath: this.props.configPath};

    this.setState({showStatistics:true});
    this.props.actions.runSelectedStatistics(request);
  }

  toggleSelectAll() {
    let newSelected = {};

    if (this.state.selectAll === 0) {
      this.state.data.forEach(x => {
          newSelected[x.key] = true;
      });
    }

    this.setState({
      selected: newSelected,
      selectAll: this.state.selectAll === 0 ? 1 : 0
    });
  }
  
  toggleRow(key) {
    const newSelected = Object.assign({}, this.state.selected);
    newSelected[key] = !this.state.selected[key];
    this.setState({
      selected: newSelected,
      selectAll: 2
    });
  }

  render() {

    const columns = [
      {
        Header: "Statistics",
        columns: [
          {
            id: "checkbox",
            accessor: "",
            Cell: ({ original }) => {
              return (
                <input
                  type="checkbox"
                  className="checkbox"
                  checked={this.state.selected[original.key] === true}
                  onChange={() => this.toggleRow(original.key)}
                />
              );
            },
            Header: x => {
              return (
                <input
                  type="checkbox"
                  className="checkbox"
                  checked={this.state.selectAll === 1}
                  ref={input => {
                    if (input) {
                      input.indeterminate = this.state.selectAll === 2;
                    }
                  }}
                  onChange={() => this.toggleSelectAll()}
                />
              );
            },
            sortable: false,
            width: 45,
            style: { 'textAlign': 'center' }
          },
          {
            Header: "Name",
            accessor: "name",
            maxWidth: 160,
          },
          {
            Header: "Description",
            id: "description",
            accessor: d => d.description,
            minWidth: 180,
          }
        ]
      }
    ];

    return (
      <div>
        <div>
          <Table
            data={this.state.data}
            columns={columns}
            minRows={5}
            defaultPageSize={5}
            showPagination={true}
          />
        </div>
        <div>
          <span style={{float: 'right'}}>
            <div className = "ComponentBox">
              <button className = "FuseButton" type="button" onClick={e => this.runStatistics()}>Calculate Stats</button>
            </div>
            <div className = "ComponentBox">
              <button type="button" onClick={e => this.runSelectedStatistics()}>Calculate Selected</button>
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
    loading: state.statistics.loading,
    configPath: state.configuration.configPath
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions : bindActionCreators(Object.assign({}, { runStatistics, runSelectedStatistics }) , dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Statistics);