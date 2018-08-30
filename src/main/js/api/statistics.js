var baseAPI = require('./base');

var statisticsAPI = {
  runSelectedStatistics: function(request) {
    console.log('api');
    console.log(request);
    return baseAPI.json('/action/statistics/selected', request);
  }
};

module.exports = statisticsAPI;
