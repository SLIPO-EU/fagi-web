var baseAPI = require('./base');

var fusionAPI = {
    runStatistics: function() {
      return baseAPI.json('/action/statistics/run');
    },
    fuse: function(config) {
      console.log('api config:');
      console.log(config);
      
      return baseAPI.json('/action/fusion/run', config);
    },
    upload: function(file) {
      return baseAPI.json('/action/upload', file);
    }     
  };

module.exports = fusionAPI;
