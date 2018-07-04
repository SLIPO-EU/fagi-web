const React = require('react');

import { connect } from 'react-redux';
import Chart from './Chart';

var { bindActionCreators } = require('redux');
var chartOption = require('../../constants/ChartOptions');
var chartDefaultOption = require('../../constants/ChartDefaultOptions');
var { runStatistics, runSelectedStatistics } = require('../../actions/StatisticsActions');
import Table from './Table';
import Checkbox from './Checkbox';

function makeData() {
  return [
    {
      key: 'stat1',
      name: "stat1",
      description: "description1"
    },
    {
      key: 'stat2',
      name: "stat2",
      description: "description2"
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
    },
    {
      key: 'stat7',
      name: "stat7",
      description: "description7"
    },
    {
      key: 'stat8',
      name: "stat8",
      description: "description8"
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

    //TODO: filter keys when unchecked
    let stats = Object.keys(this.state.selected);
    let request = {};
    request.statistics = stats;

    this.setState({showStatistics:true});
    this.props.actions.runSelectedStatistics(request);
  }
  
  toggleSelectAll() {
    let newSelected = {};

    if (this.state.selectAll === 0) {
      this.state.data.forEach(x => {
          newSelected[x.name] = true;
      });
    }

    this.setState({
      selected: newSelected,
      selectAll: this.state.selectAll === 0 ? 1 : 0
    });
  }
  
  toggleRow(name) {
    const newSelected = Object.assign({}, this.state.selected);
    newSelected[name] = !this.state.selected[name];
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
                  checked={this.state.selected[original.name] === true}
                  onChange={() => this.toggleRow(original.name)}
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
            <div className = "FusionBox">
              <button className = "FuseButton" type="button" onClick={e => this.runStatistics()}>Calculate Stats</button>
            </div>
            <div className = "FusionBox">
              <button className = "FuseButton" type="button" onClick={e => this.runSelectedStatistics()}>Calculate Selected</button>
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
    actions : bindActionCreators(Object.assign({}, { runStatistics, runSelectedStatistics }) , dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Statistics);