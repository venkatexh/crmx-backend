const express = require("express");
const Router = express.Router({ mergeParams: true });

const { createContact, getUserContacts } = require("../handlers/contact");

Router.route("/").post(createContact).get(getUserContacts);

module.exports = Router;
