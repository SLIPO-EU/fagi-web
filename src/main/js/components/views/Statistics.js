const React = require('react');
var _ = require('lodash');
import { connect } from 'react-redux';
var { bindActionCreators } = require('redux');
var chartDefaultOption = require('../../constants/ChartDefaultOptions');
var statistics = require('../../constants/Statistics');
var chartConfig = require('../../helpers/chart-config');
var { runSelectedStatistics, clear } = require('../../actions/StatisticsActions');
import Chart from './Chart';
import Table from './Table';
import Checkbox from './Checkbox';

function createChartComponents(charts) {
  if(charts.length === 0){
    return(
      <div className="Chart" key={i}>
      <Chart 
        option={chartDefaultOption}
        defaultOption={chartDefaultOption}
        loading={true}
        show={true}
      />
      </div>
    );
  }
  
  var chartComponents = [];
  
  for(var i=0; i<charts.length; i++){
    chartComponents.push((
      <div className="Chart" key={i}>
      <Chart 
        option={charts[i]}
        defaultOption={chartDefaultOption}
        loading={true}
        show={true}
      />
      </div>
     )
    );
  }
  return chartComponents;
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
      data: statistics
    }
    this.toggleRow = this.toggleRow.bind(this);
  }

  runSelectedStatistics(){

    var filtered = _.pickBy(this.state.selected);
    let stats = Object.keys(filtered);
    let request = {statistics: stats, configPath: this.props.configPath};

    this.setState({showStatistics:true});
    this.props.actions.runSelectedStatistics(request);
  }

  clear() {
    this.setState({
      selected: {},
      selectAll: 0
    });
    this.props.actions.clear();
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
                  disabled={this.props.fusionComplete ? false : original.key.startsWith("fused")}
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
            minWidth: 80
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

    let chartComponents = [];
    if(this.props.statistics.statistics){
      let statsArray = Object.values(this.props.statistics.statistics);

      let barCharts = statsArray.filter(stat => {
        return stat.type === 'BAR';
      });

      chartComponents = createChartComponents(chartConfig.getGroupCharts(barCharts));

    } else {
      chartComponents = createChartComponents([]);
    }

    return (
      <div>
        <div className="breadcrumb">
            <span>
            <li className="breadcrumb-item">
                Statistics
            </li>
            </span>
        </div>
        <div className="card">
          <div className = "CalculateWrapper">
            <button className="fagi-button-green" onClick={e => this.runSelectedStatistics()}>Calculate</button>
            <button className="fagi-button-red" onClick={e => this.clear()}>Clear</button>
          </div>
          <Table
            data={this.state.data}
            columns={columns}
            minRows={8}
            defaultPageSize={8}
            showPagination={true}
          />
        </div>
       <div className="card">
        {chartComponents}
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
    configPath: state.configuration.configPath,
    fusionComplete: state.app.fusionComplete
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions : bindActionCreators(Object.assign({}, { runSelectedStatistics, clear }) , dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Statistics);