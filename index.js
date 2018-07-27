"use strict";
const Joi = require("joi");

const formDump = {
  name: "formDump",
  register: async function(server, options) {
    try {
      server.route(require("./routes")(options));
    } catch (e) {
      server.log("Unexpected Error in Logging Request");
      server.log(e);
    }
  }
};

module.exports = formDump;
