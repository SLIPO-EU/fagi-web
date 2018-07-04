var baseAPI = require('./base');

var statisticsAPI = {
  runStatistics: function() {
    return baseAPI.json('/action/statistics/run');
  },
  runSelectedStatistics: function(request) {
    console.log('api');
    console.log(request);
    return baseAPI.json('/action/statistics/selected', request);
  }
};

module.exports = statisticsAPI;
