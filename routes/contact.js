const express = require("express");
const Router = express.Router({mergeParams: true});

const {
  createContact,
  getUserContacts,
  getContactsByTag,
  getContact
} = require("../handlers/contact");

Router.route("/user/:id/contacts/").post(createContact).get(getUserContacts);
Router.route('/contact/:id').get(getContact);
Router.route("/tag/:id/contacts").get(getContactsByTag);

module.exports = Router;
