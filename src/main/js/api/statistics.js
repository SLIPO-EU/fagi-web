var baseAPI = require('./base');

var statisticsAPI = {
  runStatistics: function() {
    return baseAPI.json('/action/statistics/run');
  }   
};

module.exports = statisticsAPI;
