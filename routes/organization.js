const express = require("express");
const Router = express.Router({ mergeParams: true });
const {
  createOrganization,
  getUserOrganization,
} = require("../handlers/organization");

Router.route("/").post(createOrganization).get(getUserOrganization);

module.exports = Router;
