const express = require("express");
const Router = express.Router({mergeParams: true});

const {createCampaign, getUserCampaigns, getCampaign} = require("../handlers/campaign");
const {sendCampaign} = require("../handlers/sendEmail");

Router.route("/user/:id/campaigns").post(createCampaign).get(getUserCampaigns);
Router.route("/campaign/:id").get(getCampaign);
Router.route("/send").post(sendCampaign);

module.exports = Router;
