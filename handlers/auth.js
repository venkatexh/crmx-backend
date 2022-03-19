const db = require("../models");
const jwt = require("jsonwebtoken");
const md5 = require("md5");

exports.signin = async (req, res, next) => {
  try {
    let user = await db.User.findOne({ email: req.body.email });
    let { id, email, firstName, lastName, organizationId } = user;
    let isMatch = await user.comparePassword(req.body.password);
    if (isMatch) {
      let token = jwt.sign({ id, email }, "crmx secret");
      let userOrganization = await db.Organization.findById(organizationId);
      return res.status(200).json({
        id,
        email,
        token,
        firstName,
        lastName,
        organization: userOrganization,
      });
    } else {
      return next({
        status: 400,
        message: "Invalid email or password",
      });
    }
  } catch (err) {
    return next({
      status: 400,
      message: "Invalid email or password",
    });
  }
};

exports.signup = async (req, res, next) => {
  try {
    let user = await db.User.create(req.body);
    const internalId = md5(req.body.orgName + Date.now());
    let createdOrg = await db.Organization.create({
      name: req.body.orgName,
      owner: user.id,
      orgInternalId: internalId,
    });
    user.organizationId = createdOrg.id;
    user.save();
    let { id, email, firstName, lastName, organizationId } = user;
    let token = jwt.sign({ id, email }, "crmx secret");
    let userOrganization = await db.Organization.findById(organizationId);
    return res.status(200).json({
      id,
      email,
      token,
      firstName,
      lastName,
      organization: userOrganization,
    });
  } catch (err) {
    if (err.Code === 11000) {
      err.message = "Email already taken";
    }
    return next({
      status: 400,
      message: err.message,
    });
  }
};
