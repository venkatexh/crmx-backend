const express = require("express");
const Router = express.Router();

const { sendCampaign } = require("../handlers/sendEmail");

Router.post("/", sendCampaign);

module.exports = Router;
