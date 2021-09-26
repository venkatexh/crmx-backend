const express = require("express");
const Router = express.Router({ mergeParams: true });
const { createTag } = require("../handlers/tag");

Router.route("/").post(createTag);

module.exports = Router;
