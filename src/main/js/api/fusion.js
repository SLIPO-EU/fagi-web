var baseAPI = require('./base');

var fusionAPI = {
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
