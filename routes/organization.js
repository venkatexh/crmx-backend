const express = require("express");
const Router = express.Router({ mergeParams: true });
const {
  createOrganization,
  getUserOrganization,
  createOrganizationUser,
  getOrganizationUsers,
  inviteUser,
  verifyInvite,
} = require("../handlers/organization");

Router.route("/").post(createOrganization).get(getUserOrganization);
Router.route("/users").post(createOrganizationUser).get(getOrganizationUsers);
Router.route("/invite").post(inviteUser);
Router.route("/verify-invite").post(verifyInvite);

module.exports = Router;
