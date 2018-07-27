"use strict";
const url = require("url");
const Boom = require("boom");

module.exports = options => {
  const FormModels = require("./models")(options);

  return {
    logMessage: function(request, h) {
      return FormModels.logMessageRequest(
        request.payload,
        url.parse(request.headers.origin).hostname
      )
        .then(result => {
          console.log("within api then function " + result);
          request.log("info", "successful server response");
          return result;
        })
        .catch(err => {
          request.log("error", err);
          throw Boom.boomify(err);
        });
    }
  };
};
