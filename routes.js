"use strict";

const Joi = require("joi");
const _ = require("lodash");
const url = require("url");

module.exports = options => {
  const FormApi = require("./api")(options);
  return [
    {
      method: "POST",
      path: options.path,
      handler: FormApi.logMessage,
      options: {
        description: "Return data according to query params",
        tags: ["api"],
        validate: {
          payload: async function(payload, options) {
            const origin = url.parse(options.context.headers.origin).hostname;
            return Joi.validate(payload, options.schema[origin]);
          },
          options: {
            schema: options.schema
          }
        }
      }
    }
  ];
};
