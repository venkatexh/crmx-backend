const db = require("../models");
const jwt = require("jsonwebtoken");

exports.signin = async (req, res, next) => {
  try {
    let user = await db.User.findOne({email: req.body.email});
    let {id, email, firstName, lastName, company, plan, billing_address} = user;
    let isMatch = await user.comparePassword(req.body.password);
    if (isMatch) {
      let token = jwt.sign({id, email}, "crmx secret");
      return res
        .status(200)
        .json({id, email, token, firstName, lastName, company, plan, billing_address});
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
    let {id, email, firstName, lastName, company} = user;
    let token = jwt.sign({id, email}, "crmx secret");
    return res
      .status(200)
      .json({id, email, token, firstName, lastName, company});
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
