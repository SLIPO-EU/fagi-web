const React = require('react');
var _ = require('lodash');
import { connect } from 'react-redux';
var { bindActionCreators } = require('redux');
var chartDefaultOption = require('../../constants/ChartDefaultOptions');
var chartConfig = require('../../helpers/chart-config');
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
      key: 'nonEmptyNames',
      name: "Total number of name properties.",
      description: "Total number of POIs that have the name property in each input dataset."
    },
    {
      key: 'nonEmptyPhones',
      name: "Total number of phone properties.",
      description: "Total number of POIs that have the phone property in each input dataset."
    },
    {
      key: 'nonEmptyStreets',
      name: "Total number of address street properties.",
      description: "Total number of POIs that have the address street property in each input dataset."
    },
    {
      key: 'nonEmptyStreetNumbers',
      name: "Total number of address street number properties.",
      description: "Total number of POIs that have the address street number property in each input dataset."
    },
    {
      key: 'nonEmptyWebsites',
      name: "Total number of website properties.",
      description: "Total number of POIs that have the website property in each input dataset."
    },
    {
      key: 'nonEmptyEmails',
      name: "Total number of email properties.",
      description: "Total number of POIs that have the email property in each input dataset."
    },
    {
      key: 'nonEmptyDates',
      name: "Total number of date properties.",
      description: "Total number of POIs that have the date property in each input dataset."
    },
    {
      key: 'emptyNames',
      name: "Total number of empty name properties.",
      description: "Total number of POIs that don' t have the name property in each input dataset."
    },
    {
      key: 'emptyPhones',
      name: "Total number of empty phone properties.",
      description: "Total number of POIs that don' t have the phone property in each input dataset."
    },
    {
      key: 'emptyStreets',
      name: "Total number of empty address street properties.",
      description: "Total number of POIs that don' t have the address street property in each input dataset."
    },
    {
      key: 'emptyStreetNumbers',
      name: "Total number of empty address street number properties.",
      description: "Total number of POIs that don' t have the address street number property in each input dataset."
    },
    {
      key: 'emptyWebsites',
      name: "Total number of empty website properties.",
      description: "Total number of POIs that don' t have the website property in each input dataset."
    },
    {
      key: 'emptyEmails',
      name: "Total number of empty email properties.",
      description: "Total number of POIs that don' t have the email property in each input dataset."
    },
    {
      key: 'emptyDates',
      name: "Total number of empty date properties.",
      description: "Total number of POIs that don' t have the date property in each input dataset."
    },
    {
      key: 'distinctProperties',
      name: "Distinct Properties.",
      description: "Number of distinct properties in each input dataset."
    },
    {
      key: 'primaryDatesFormatPercent',
      name: "Percentage of primary date formats.",
      description: "Percentage of primary date formats in each input dataset."
    },     
    {
      key: 'namesPercent',
      name: "Percentage of names.",
      description: "Percentage of name property in each input dataset."
    },
    {
      key: 'websitesPercent',
      name: "Percentage of websites.",
      description: "Percentage of website property in each input dataset."
    },
    {
      key: 'emailsPercent',
      name: "Percentage of e-mails.",
      description: "Percentage of e-mail property in each input dataset."
    },
    {
      key: 'phonesPercent',
      name: "Percentage of phones.",
      description: "Percentage of phone property in each input dataset."
    },
    {
      key: 'streetsPercent',
      name: "Percentage of streets.",
      description: "Percentage of street property in each input dataset."
    },
    {
      key: 'streetNumbersPercent',
      name: "Percentage of street numbers.",
      description: "Percentage of street number property in each input dataset."
    },
    {
      key: 'localityPercent',
      name: "Percentage of locality property.",
      description: "Percentage of locality property in each input dataset."
    },
    {
      key: 'datesPercent',
      name: "Percentage of dates.",
      description: "Percentage of date property in each input dataset."
    },
    {
      key: 'linkedPois',
      name: "Linked POIs.",
      description: "Number of linked POIs in each input dataset."
    },
    {
      key: 'linkedVsTotal',
      name: "Linked vs total POIs.",
      description: "Number of linked vs total POIs in the datasets."
    },
    {
      key: 'linkedTriples',
      name: "Linked Triples.",
      description: "Number of linked triples from each dataset (Triples associated with a linked POI)."
    },     
  ];
}

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

    let chartsData = null;
    let chartComponents = [];

    if(this.props.statistics.statistics){
      let statsArray = Object.values(this.props.statistics.statistics);
      let chartsData = chartConfig.getChartData(statsArray);
      chartComponents = createChartComponents(chartsData);
    } else {
      chartComponents = createChartComponents([]);
    }

    return (
      <div>
        <div>
          <Table
            data={this.state.data}
            columns={columns}
            minRows={8}
            defaultPageSize={8}
            showPagination={true}
          />
        </div>
        <div>
          <span style={{float: 'right'}}>
            <div className = "ComponentBox">
              <button className="FuseButton" onClick={e => this.runSelectedStatistics()}>Calculate Selected</button>
            </div>
          </span>
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
    configPath: state.configuration.configPath
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions : bindActionCreators(Object.assign({}, { runStatistics, runSelectedStatistics }) , dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Statistics);