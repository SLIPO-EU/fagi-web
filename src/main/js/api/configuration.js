var baseAPI = require('./base');

var configAPI = {
    upload: function(file) {
      return baseAPI.json('/action/upload', file);
    }     
  };

module.exports = configAPI;
