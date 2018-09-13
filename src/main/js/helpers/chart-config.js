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
    axisTick: {show: true, alignWithLabel: true, interval: 0.1},
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

export const getGroupCharts = function (stats){

  var percents = stats.filter(stat => {
    return stat.group.enumGroup === 'PERCENT'
  });

  var properties = stats.filter(stat => {
    return stat.group.enumGroup === 'PROPERTY'
  });
  
  var tripleBased = stats.filter(stat => {
    return stat.group.enumGroup === 'TRIPLE_BASED'
  });

  var poiBased = stats.filter(stat => {
    return stat.group.enumGroup === 'POI_BASED'
  });

  let groupCharts = [];
  if(percents.length > 0){
    groupCharts.push(getGroup(percents));
  }
  
  if(properties.length > 0){
    groupCharts.push(getGroup(properties));
  }
  
  if(tripleBased.length > 0){
    groupCharts.push(getGroup(tripleBased));
  }
  
  if(poiBased.length > 0){
    groupCharts.push(getGroup(poiBased));
  }

  return groupCharts;
}

var getGroup = function (statsArray){

  let sampleStat = statsArray[0];
  let gLegendTotal = sampleStat.group.legendTotal;
  let title = sampleStat.group.title;
  let gLegendA = sampleStat.group.legendA;
  let gLegendB = sampleStat.group.legendB;
  let chartType = sampleStat.type.toLowerCase();

  let groupData = {
      title: {
        text: title
      },
      legend: {
          data:[gLegendTotal, gLegendA, gLegendB]
      },
      xAxis: {
          data: statsArray.map(stat => (stat.legendTotal)),
          axisTick: {show: true, alignWithLabel: true}
      },
      yAxis: {
          splitLine: {show: true}
      },
      tooltip: {
        show:true,
        trigger: "axis"
      },
      animationDurationUpdate: 1000,
      series: [{
          name: gLegendTotal,
          type: chartType,
          itemStyle: {
              normal: {
                  color: '#ddd'
              }
          },
          silent: true,
          barWidth: barWidth,
          barGap: '-100%', 
          data: statsArray.map(stat => (stat.valueTotal))
      }, {
          name: gLegendA,
          type: chartType,
          barWidth: barWidth,
          z: 10,
          data: statsArray.map(stat => (stat.valueA))
      }, {
          name: gLegendB,
          type: chartType,
          barWidth: barWidth,
          z: 10,
          data: statsArray.map(stat => (stat.valueB))
      }],
      color:['rgba(255, 233, 172, 0.6)','rgba(210, 210, 255, 0.9)', '#61a0a8', '#d48265', '#91c7ae','#749f83',  
        '#ca8622', '#bda29a','#6e7074', '#546570', '#c4ccd3']
  }

  return groupData;
};
