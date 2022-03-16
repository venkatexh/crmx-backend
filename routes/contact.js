const express = require("express");
const Router = express.Router({ mergeParams: true });

const {
  createContact,
  getOrgContacts,
  getContactsByTag,
  getContact,
  removeContactTag,
  addTagToContact,
  getContactTags,
  removeContact,
  unsubscribeContact,
  subscribeContact,
} = require("../handlers/contact");

Router.route("/user/contacts").post(createContact).get(getOrgContacts);
Router.route("/contact/:id").get(getContact).delete(removeContact);
Router.route("/contact/:id/unsubscribe").post(unsubscribeContact);
Router.route("/contact/:id/subscribe").post(subscribeContact);
Router.route("/contact/:id/tags").get(getContactTags);
Router.route("/tag/:id/contacts").get(getContactsByTag);
Router.route("/contact").post(addTagToContact).delete(removeContactTag);

module.exports = Router;
