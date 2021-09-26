const db = require("../models");

exports.createTag = async (req, res, next) => {
  try {
    const foundUser = await db.User.findById(req.params.id);
    const userTags = await db.Tag.find({ owner: req.params.id });
    let duplicate = false;
    await userTags.forEach((tag) => {
      if (tag.name === req.body.name) {
        duplicate = true;
      }
    });
    if (duplicate) {
      return res.status(400).json({ message: "Tag already exists." });
    } else {
      let tag = await db.Tag.create({
        name: req.body.name,
        owner: req.params.id,
        contacts: req.body.contacts,
      });
      foundUser.tags.push(tag.id);
      await foundUser.save();
      await req.body.contacts.forEach((contactId) => {
        db.Contact.findById(contactId).then((contact) => {
          contact.tags.push(tag.id);
          contact.save();
        });
      });
      let foundTag = await db.Tag.findById(tag.id);
      console.log(foundTag);
      return res.status(200).json(foundTag);
    }
  } catch (err) {
    return next(err);
  }
};
