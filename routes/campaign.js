const express = require("express");
const Router = express.Router({ mergeParams: true });

const { createCampaign } = require("../handlers/campaign");

Router.route("/:id/create").post(createCampaign);

module.exports = Router;
