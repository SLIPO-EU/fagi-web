var $ = require('jquery');
require('es6-promise').polyfill();

function updateCsrfToken(crsf) {
  $('meta[name=_csrf]').attr('content', crsf);
  $('input[name=_csrf]').val(crsf);
}

var sendRequest = function(url, data, contentType, method) {
  var request = {
    type : method || (data ? 'POST' : 'GET'),
    dataType : 'json',
    contentType : contentType,
    data : data,
    url : url
  };

  return new Promise(function(resolve, reject) {
    $.ajax(request).done(function(data, textStatus, request) {
      resolve(data);
    }).fail(function(jqXHR, textStatus, errorThrown) {

      var status;

      switch (jqXHR.status) {
        case 401:
          break;
        case 400:
        case 403:
        case 404:
          status = jqXHR.status;
          break;
        default:
          status = 500;
          break;
      }

      var errorCodeSuffix = status;

      if((jqXHR.responseJSON) && (jqXHR.responseJSON.errors) && (jqXHR.responseJSON.errors.length > 0)) {
        errorCodeSuffix = jqXHR.responseJSON.errors[0].code;
      }

      var errors = [
        {
          code : 'Error.' + errorCodeSuffix,
          description : 'Error.' + errorCodeSuffix,
          details : errorThrown
        }
      ];

      reject(errors);
    });
  });
};

var api = {
  json : function(url, data, method) {
    var serializedData = data;
    if ((data) && (typeof data === 'object')) {
      serializedData = JSON.stringify(data);
    }
    return sendRequest(url, serializedData, 'application/json; charset=UTF-8', method);
  }
};

module.exports = api;
