var barWidth = 60;

export const getChartData = (stats) => stats.map(stat => ({
  title: {
    text: stat.title
  },
  legend: {
    data:[stat.legendTotal, stat.legendA, stat.legendB],
    top: '10%'
  },
  xAxis: {
    data: [stat.legendTotal],
    axisTick: {show: true},
  },
  yAxis: {
    splitLine: {show: true}
  },
  animationDurationUpdate: 1000,
  series: [{
    name: stat.legendTotal,
    type: stat.type.toLowerCase(),
    itemStyle: {
      normal: {
          color: '#ddd'
      }
    },
    silent: true,
    barWidth: barWidth,
    barGap: '-100%', 
    data: [stat.valueTotal]
  }, {
    name: stat.legendA,
    type: stat.type.toLowerCase(),
    barWidth: barWidth,
    z: 10,
    data: [stat.valueA]
  }, {
    name: stat.legendB,
    type: stat.type.toLowerCase(),
    barWidth: barWidth,
    z: 10,
    data: [stat.valueB]
  }],
  color:['rgba(255, 233, 172, 0.6)','rgba(210, 210, 255, 0.9)', '#61a0a8', '#d48265', '#91c7ae','#749f83',  
    '#ca8622', '#bda29a','#6e7074', '#546570', '#c4ccd3']
}));

//percent example
const getGroupChartDataExample = {
    legend: {
        data:['Total POIs', 'Non empty fields A(%)','Non empty fields B(%)']
    },
    
    xAxis: {
        data: ['Name', 'Phone', 'Address', 'Known Date formats'],
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
        barWidth: barWidth,
        barGap: '-100%', 
        data: [100, 100, 100, 100]
    }, {
        name:'Non empty fields A(%)',
        type: 'bar',
        barWidth: barWidth,
        z: 10,
        data: [97, 54, 73, 4]
    }, {
        name:'Non empty fields B(%)',
        type: 'bar',
        barWidth: barWidth,
        z: 10,
        data: [71, 95, 43, 65]
    }],
    color:['rgba(255, 233, 172, 0.6)','rgba(210, 210, 255, 0.9)', '#61a0a8', '#d48265', '#91c7ae','#749f83',  
      '#ca8622', '#bda29a','#6e7074', '#546570', '#c4ccd3']
}; 
