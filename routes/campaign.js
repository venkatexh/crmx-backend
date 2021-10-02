const express = require("express");
const Router = express.Router({ mergeParams: true });

const { createCampaign, getUserCampaigns } = require("../handlers/campaign");
const { sendCampaign } = require("../handlers/sendEmail");

Router.route("/").post(createCampaign).get(getUserCampaigns);

Router.route("/send").post(sendCampaign);

module.exports = Router;
