const express = require("express");
const Router = express.Router({ mergeParams: true });
const { createTag, getOrgTags } = require("../handlers/tag");

Router.route("/").post(createTag).get(getOrgTags);

module.exports = Router;
