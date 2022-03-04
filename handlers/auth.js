const db = require("../models");
const jwt = require("jsonwebtoken");

exports.signin = async (req, res, next) => {
  try {
    let user = await db.User.findOne({ email: req.body.email });
    let { id, email, firstName, lastName, organization } = user;
    let isMatch = await user.comparePassword(req.body.password);
    if (isMatch) {
      let token = jwt.sign({ id, email }, "crmx secret");
      let userOrganization = await db.Organization.findById(organization);
      return res.status(200).json({
        id,
        email,
        token,
        firstName,
        lastName,
        userOrganization,
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
    let { id, email, firstName, lastName, organization } = user;
    let token = jwt.sign({ id, email }, "crmx secret");
    let userOrganization = await db.Organization.findById(organization);
    return res
      .status(200)
      .json({ id, email, token, firstName, lastName, userOrganization });
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
