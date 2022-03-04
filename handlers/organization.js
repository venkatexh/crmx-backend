const md5 = require("md5");
const db = require("../models");
exports.createOrganization = async (req, res, next) => {
  try {
    const internalId = md5(req.body.name + Date.now());
    const organization = await db.Organization.create({
      name: req.body.name,
      orgInternalId: internalId,
      owner: req.body.owner,
    });
    organization.admins.push(req.body.owner);
    await organization.save();
    res.status(201).send("Organization created");
  } catch (err) {
    return next(err);
  }
};
