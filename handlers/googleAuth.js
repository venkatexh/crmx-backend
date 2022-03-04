const db = require("../models");
const jwt = require("jsonwebtoken");
const { OAuth2Client } = require("google-auth-library");
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

exports.createUser = async (req, res, next) => {
  try {
    const { idToken, accessToken } = req.body;
    console.log(req.body);
    const ticket = await client.verifyIdToken({
      idToken: idToken,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const { given_name, family_name, email, picture } =
      await ticket.getPayload();
    console.log(ticket.getPayload());

    let foundUser = await db.User.findOne({ email: email });
    if (foundUser) {
      console.log("found");
      console.log(foundUser);
      const { id, email, firstName, lastName, organization } = foundUser;
      let jwtToken = jwt.sign({ id, email }, "crmx secret");
      let userOrganization = await db.Organization.findById(organization);
      return res
        .status(200)
        .json({ id, email, jwtToken, firstName, lastName, userOrganization });
    } else {
      console.log("created");
      let user = await db.User.create({
        googleIdToken: idToken,
        googleAccessToken: accessToken,
        email: "venkatesh46.ch@gmail.com",
        firstName: given_name,
        lastName: family_name,
      });
      console.log("debug");
      const { id, email, firstName, lastName, organization } = user;
      let jwtToken = jwt.sign({ id, email }, "crmx secret");
      return res
        .status(200)
        .json({ id, email, jwtToken, firstName, lastName, organization });
    }
  } catch (err) {
    console.log(err.message);
    return next({
      status: 400,
      message: err.message,
    });
  }
};
