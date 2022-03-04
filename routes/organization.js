const express = require("express");
const Router = express.Router({ mergeParams: true });
const { createOrganization } = require("../handlers/organization");

Router.route("/").post(createOrganization);

module.exports = Router;
