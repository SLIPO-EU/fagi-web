var api = require('./base');
var $ = require('jquery');

var StatisticsAPI = {
    runStatistics: function() {
      return api.json('/action/statistics/run');
    }
  };

module.exports = StatisticsAPI;
