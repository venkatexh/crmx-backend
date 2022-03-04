const express = require("express");
const {
  getOrgNotifications,
  getNotification,
} = require("../handlers/notifications");
const Router = express.Router({ mergeParams: true });

Router.route("/organization").get(getOrgNotifications);
Router.route("/:id").get(getNotification);

module.exports = Router;
