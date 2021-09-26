const express = require("express");
const Router = express.Router({ mergeParams: true });
const { createTag, getUserTags } = require("../handlers/tag");

Router.route("/").post(createTag).get(getUserTags);

module.exports = Router;
