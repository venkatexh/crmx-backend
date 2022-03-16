const db = require("../models");

exports.createTag = async (req, res, next) => {
  try {
    const foundOrg = await db.User.findById(req.query.org_);
    const orgTags = await db.Tag.find({ owner: req.query.org_id });
    let duplicate = false;
    await orgTags.forEach((tag) => {
      if (tag.name === req.body.name) {
        duplicate = true;
      }
    });
    if (duplicate) {
      return res.status(400).json({ message: "Tag already exists." });
    } else {
      let tag = await db.Tag.create({
        name: req.body.name,
        owner: req.query.org_id,
        createdBy: req.query.user_id,
        contacts: req.body.contacts,
      });
      foundOrg.tags.push(tag.id);
      await foundOrg.save();
      await req.body.contacts.forEach((contactId) => {
        db.Contact.findById(contactId).then((contact) => {
          contact.tags.push(tag.id);
          contact.save();
        });
      });
      let foundTag = await db.Tag.findById(tag.id);
      return res.status(200).json(foundTag);
    }
  } catch (err) {
    return next(err);
  }
};

exports.getOrgTags = async (req, res, next) => {
  try {
    const tags = await db.Tag.find({ owner: req.query.org_id });
    return res.status(200).json(tags);
  } catch (err) {
    return next(err);
  }
};
