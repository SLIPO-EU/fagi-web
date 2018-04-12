var baseAPI = require('./base');

var fusionAPI = {
    runStatistics: function() {
      return baseAPI.json('/action/statistics/run');
    },
    fuse: function(config) {
      return baseAPI.json('/action/fusion/run', config);
    }    
  };

module.exports = fusionAPI;
