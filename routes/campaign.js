const express = require("express");
const Router = express.Router({ mergeParams: true });

const { createCampaign, getUserCampaigns } = require("../handlers/campaign");

Router.route("/").post(createCampaign).get(getUserCampaigns);

module.exports = Router;
