const express = require("express");
const Router = express.Router({ mergeParams: true });

const {
  createCampaign,
  getOrgCampaigns,
  getCampaign,
} = require("../handlers/campaign");
const { sendCampaign } = require("../handlers/sendEmail");

Router.route("/user/campaigns").post(createCampaign).get(getOrgCampaigns);
Router.route("/campaign/:id").get(getCampaign);
Router.route("/send").post(sendCampaign);

module.exports = Router;
