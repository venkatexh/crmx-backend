const db = require("../models");

exports.createContact = async (req, res, next) => {
  try {
    let foundUser = await db.User.findById(req.params.id);
    let userContacts = await db.Contact.find({owner: req.params.id});
    let duplicate = false;
    await userContacts.forEach((contact) => {
      if (contact.email === req.body.email) {
        duplicate = true;
      }
    });
    if (duplicate) {
      return res
        .status(400)
        .json({message: "Contact with same email already exists."});
    } else {
      let contact = await db.Contact.create({
        email: req.body.email,
        status: req.body.status,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        location: req.body.location,
        language: req.body.language,
        tags: req.body.tags.map(tag => tag.id),
        owner: req.params.id,
      });
      foundUser.contacts.push(contact.id);
      await foundUser.save();
      for (const id in req.body.tags) {
        const tag = await db.Tag.findById(req.body.tags[id].id);
        tag.contacts.push(contact.id);
        tag.save();
      }
      let foundContact = await db.Contact.findById(contact.id);
      return res.status(200).json(foundContact);
    }
  } catch (err) {
    return next(err);
  }
};

exports.removeContact = async (req, res, next) => {
  try {
    await db.Contact.findByIdAndDelete(req.params.id);
    return res.status(200).json({message: "Contact deleted"})
  } catch (err) {
    return next(err);
  }
};

exports.subscribeContact = async (req, res, next) => {
  try {
    let contact = await db.Contact.findByIdAndUpdate(req.params.id, {status: "Subscribed"}, {new: true});
    return res.status(200).json(contact);
  } catch (err) {
    return next(err);
  }
}

exports.unsubscribeContact = async (req, res, next) => {
  try {
    let contact = await db.Contact.findByIdAndUpdate(req.params.id, {status: "Unsubscribed"}, {new: true});
    console.log(contact);
    return res.status(200).json(contact);
  } catch (err) {
    return next(err);
  }
}

exports.getUserContacts = async (req, res, next) => {
  try {
    let contacts = await db.Contact.find({owner: req.params.id});
    return res.status(200).json(contacts);
  } catch (err) {
    return next(err);
  }
};

exports.getContactsByTag = async (req, res, next) => {
  try {
    let tag = await db.Tag.findById(req.params.id);
    const contacts = [];
    for (const id of tag.contacts) {
      const contact = await db.Contact.findById(id.toString());
      contact ? contacts.push(contact.email) : {};
    }
    return res.status(200).json(contacts.length > 0 ? contacts : []);
  } catch (err) {
    return next(err);
  }
};

exports.getContact = async (req, res, next) => {
  try {
    let contact = await db.Contact.findById(req.params.id);
    let tags = [];
    for (const id in contact.tags) {
      let tag = await db.Tag.findById(contact.tags[id]);
      tags.push(tag)
    }
    contact.tags = tags;
    return res.status(200).json(contact);
  } catch (err) {
    return next(err);
  }
}

exports.getContactTags = async (req, res, next) => {
  try {
    let contact = await db.Contact.findById(req.params.id);
    let tags = [];
    for (const id in contact.tags) {
      let tag = await db.Tag.findById(contact.tags[id]);
      tags.push(tag)
    }
    return res.status(200).json(tags)
  } catch (err) {
    return next(err)
  }
}

exports.addTagToContact = async (req, res, next) => {
  try {
    let contact = await db.Contact.findById(req.body.contactId);
    contact.tags.push(req.body.tagId);
    contact.save();
    return res.status(200).json(contact);
  } catch (err) {
    return next(err);
  }
}

exports.removeContactTag = async (req, res, next) => {
  try {
    let contact = await db.Contact.findById(req.body.contactId);
    contact.tags = await contact.tags.filter(id => id.toString() !== req.body.tagId);
    await contact.save();
    let updatedContact = await db.Contact.findById(contact.id);
    let tags = [];
    for (const id in updatedContact.tags) {
      let tag = await db.Tag.findById(updatedContact.tags[id]);
      tags.push(tag)
    }
    updatedContact.tags = tags;
    console.log(updatedContact)
    return res.status(200).json(updatedContact);
  } catch (err) {
    return next(err);
  }
}
