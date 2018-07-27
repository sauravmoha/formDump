"use strict";
const util = require("util"); //for debugging
const _ = require("lodash");
const queryDSL = require("bodybuilder");
const ElasticSearch = require("elasticsearch");

module.exports = options => {
  const esClient = new ElasticSearch.Client({
    host: options.elastic_host || "localhost:9200"
  });

  return {
    logMessageRequest: function(query, requestHost) {
      console.log("query + " + util.inspect(query, false, null));
      const esBody = {};
      _.forEach(query, (val, key) => {
        esBody[key] = val;
      });
      return esClient
        .index({
          index: options.elastic_index + "_" + requestHost,
          type: "document",
          body: esBody
        })
        .then((resp, err) => {
          if (err) return false;
          console.log("returning from model");
          return true;
        });
    }
  };
};
