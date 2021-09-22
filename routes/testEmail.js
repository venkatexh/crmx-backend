const express = require("express");
const Router = express.Router();

const { sendEmail } = require("../handlers/testEmail");

Router.post("/", sendEmail);

module.exports = Router;
