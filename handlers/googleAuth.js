const db = require("../models");
const jwt = require("jsonwebtoken");
const { OAuth2Client } = require("google-auth-library");
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

exports.createUser = async (req, res, next) => {
  try {
    const { idToken, accessToken } = req.body;
    const ticket = await client.verifyIdToken({
      idToken: idToken,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const { given_name, family_name, email, picture } =
      await ticket.getPayload();
    let foundUser = await db.User.findOne({ email });
    if (foundUser) {
      const { id, email, firstName, lastName, organizationId } = foundUser;
      let jwtToken = jwt.sign({ id, email }, "crmx secret");
      let userOrganization = await db.Organization.findById(organizationId);
      return res.status(200).json({
        id,
        email,
        jwtToken,
        firstName,
        lastName,
        organization: userOrganization,
      });
    } else {
      let user = await db.User.create({
        googleIdToken: idToken,
        googleAccessToken: accessToken,
        email,
        firstName: given_name,
        lastName: family_name,
      });
      const { id, email, firstName, lastName, organizationId } = user;
      let jwtToken = jwt.sign({ id, email }, "crmx secret");
      let userOrganization = await db.Organization.findById(organizationId);
      return res.status(200).json({
        id,
        email,
        jwtToken,
        firstName,
        lastName,
        organization: userOrganization,
      });
    }
  } catch (err) {
    console.log(err.message);
    return next({
      status: 400,
      message: err.message,
    });
  }
};
