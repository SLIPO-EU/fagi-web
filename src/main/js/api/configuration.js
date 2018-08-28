var baseAPI = require('./base');

var configAPI = {
    submit: function(configuration) {
      return baseAPI.json('/action/submit', configuration);
    },
    upload: function(file) {
      return baseAPI.json('/action/upload', file);
    }     
  };

module.exports = configAPI;
