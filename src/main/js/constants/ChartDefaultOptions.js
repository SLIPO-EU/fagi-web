var barWidth = 60;

const defaultOptions = {
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
        barWidth: barWidth,
        barGap: '-100%', // Make series overlap
        data: [0, 0, 0, 0]
    }, {
        name:'Non empty fields A(%)',
        type: 'bar',
        barWidth: barWidth,
        z: 10,
        data: [0, 0, 0, 0]
    }, {
        name:'Non empty fields B(%)',
        type: 'bar',
        barWidth: barWidth,
        z: 10,
        data: [0, 0, 0, 0]
    }],
    color:['rgba(255, 233, 172, 0.6)','rgba(210, 210, 255, 0.9)', '#61a0a8', '#d48265', '#91c7ae','#749f83',  
      '#ca8622', '#bda29a','#6e7074', '#546570', '#c4ccd3']
}; 

module.exports = defaultOptions;