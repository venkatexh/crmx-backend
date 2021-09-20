const db = require("../models");

exports.createContact = async (req, res, next) => {
  try {
    let contact = await db.Contact.create({
      email: req.body.email,
      status: req.body.status,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      location: req.body.location,
      language: req.body.language,
      tags: req.body.tags,
    });
    let foundUser = await db.User.findById(req.params.id);
    foundUser.contacts.push(contact.id);
    await foundUser.save();
    let foundContact = await db.Contact.findById(contact.id);
    return res.status(200).json(foundContact);
  } catch (err) {
    return next(err);
  }
};

exports.getUserContacts = async (req, res, next) => {
  try {
    let contacts = await db.Contact.find({ owner: req.params.id });
    return res.status(200).json(contacts);
  } catch (err) {
    return next(err);
  }
};
