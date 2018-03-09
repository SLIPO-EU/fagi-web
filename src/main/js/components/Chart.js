var React = require('react');
import { connect } from 'react-redux';
var { bindActionCreators } = require('redux');

import ReactEchartsCore from 'echarts-for-react/lib/core';
//import echarts modules to reduce bundle size
import echarts from 'echarts/lib/echarts';
import 'echarts/lib/chart/bar';
import 'echarts/lib/component/legend';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';

var option = {
//    title: {
//        text: 'Statistics'
//    },
    tooltip: {},
    legend: {
        data:['Total POIs', 'Non empty fields A(%)','Non empty fields B(%)']
    },
    
    xAxis: {
        data: ['Name', 'Phone', 'Address', 'Date'],
        axisTick: {show: true},
    },
    yAxis: {
        splitLine: {show: true}
    },
    animationDurationUpdate: 1000,
    series: [{
        name: 'Total POIs',
        type: 'bar',
        itemStyle: {
            normal: {
                color: '#ddd'
            }
        },
        silent: true,
        barWidth: 70,
        barGap: '-100%', // Make series be overlap
        data: [100, 100, 100, 100]
    }, {
        name:'Non empty fields A(%)',
        type: 'bar',
        barWidth: 70,
        z: 10,
        data: [97, 54, 73, 4]
    }, {
        name:'Non empty fields B(%)',
        type: 'bar',
        barWidth: 70,
        z: 10,
        data: [71, 95, 43, 65]
    }],
    color:['rgba(255, 233, 172, 0.6)','rgba(210, 210, 255, 0.9)', '#61a0a8', '#d48265', '#91c7ae','#749f83',  
      '#ca8622', '#bda29a','#6e7074', '#546570', '#c4ccd3']
}; 

var optionEmpty = {
    xAxis: {
        data: [],
        axisTick: {show: true},
    },
    yAxis: {
        splitLine: {show: true}
    },
    animationDurationUpdate: 1000,
    series: [{
        name: 'Total',
        type: 'bar',
        itemStyle: {
          normal: {
              color: '#ddd'
          }
        },
        silent: true,
        barWidth: 70,
        barGap: '-100%', // Make series be overlap
        data: [0, 0, 0, 0]
    }, {
        name:'Non empty fields A(%)',
        type: 'bar',
        barWidth: 70,
        z: 10,
        data: [0, 0, 0, 0]
    }, {
        name:'Non empty fields B(%)',
        type: 'bar',
        barWidth: 70,
        z: 10,
        data: [0, 0, 0, 0]
    }],
    color:['rgba(255, 233, 172, 0.6)','rgba(210, 210, 255, 0.9)', '#61a0a8', '#d48265', '#91c7ae','#749f83',  
      '#ca8622', '#bda29a','#6e7074', '#546570', '#c4ccd3']
}; 

var loadingOption = {
  text: 'Calculating...',
  color: 'rgba(210, 210, 255, 0.9)',
  textColor: '#000',
  maskColor: 'rgba(255, 255, 255, 0.8)',
  zlevel: 0
};

class Chart extends React.Component {

  render() {

    let content;
    if(this.props.show){
      content = this.props.loading ? optionEmpty : option;
    } else {
      content = optionEmpty;
    }
    
    return (
      <ReactEchartsCore   
        echarts={echarts}
        option={content} 
        loadingOption={loadingOption}
        showLoading={this.props.loading}
      />
    );
  }
}

function mapStateToProps(state) {
  return {
    loading: state.app.loading
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions : bindActionCreators(Object.assign({}, { }) , dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Chart);

