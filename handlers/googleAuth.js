const db = require("../models");
const jwt = require("jsonwebtoken");
const { OAuth2Client } = require("google-auth-library");
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

exports.createUser = async (req, res, next) => {
  try {
    const { token } = req.body;
    console.log(req.body);
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const { given_name, family_name, email, picture } = ticket.getPayload();

    let foundUser = await db.User.findOne({ email: email });
    if (foundUser) {
      console.log("found");
      console.log(foundUser);
      const { id, email, firstName, lastName } = foundUser;
      let jwtToken = jwt.sign({ id, email }, "crmx secret");
      return res.status(200).json({ id, email, jwtToken, firstName, lastName });
    } else {
      console.log("created");
      let user = await db.User.create({
        googleToken: token,
        email: email,
        firstName: given_name,
        lastName: family_name,
      });
      const { id, email, firstName, lastName } = user;
      let jwtToken = jwt.sign({ id, email }, "crmx secret");
      return res.status(200).json({ id, email, jwtToken, firstName, lastName });
    }
  } catch (err) {
    return next({
      status: 400,
      message: err.message,
    });
  }
};
