const md5 = require("md5");
const db = require("../models");
const nodemailer = require("nodemailer");
const CryptoJS = require("crypto-js");

exports.createOrganization = async (req, res, next) => {
  try {
    const internalId = md5(req.body.name + Date.now());
    const organization = await db.Organization.create({
      name: req.body.name,
      orgInternalId: internalId,
      owner: req.body.owner,
    });
    organization.admins.push(req.body.owner);
    organization.save();
    res.status(201).send("Organization created");
  } catch (err) {
    return next(err);
  }
};

exports.getUserOrganization = async (req, res, next) => {
  try {
    const organization = await db.Organization.findById(req.query.org_id);
    res.status(200).send(organization);
  } catch (err) {
    return next(err);
  }
};

exports.createOrganizationUser = async (req, res, next) => {
  try {
  } catch (err) {
    return next(err);
  }
};

exports.getOrganizationUsers = async (req, res, next) => {
  try {
    const organization = await db.Organization.findById(req.query.org_id);
    const users = [];
    for (const idx in organization.admins) {
      let user = await db.User.findById(organization.admins[idx].toString());
      users.push(user);
    }
    return res.status(200).send(users);
  } catch (err) {
    return next(err);
  }
};

exports.inviteUser = async (req, res, next) => {
  try {
    const encryptedEmail = await CryptoJS.AES.encrypt(
      req.body.email,
      process.env.EMAIL_ENCRYPTION_SECRET
    ).toString();
    const user = await db.User.create({
      email: req.body.email,
      organizationId: req.body.organizationId,
      invited: true,
      encryptedEmail: encryptedEmail.replace("/", "+"),
    });
    const organization = await db.Organization.findById(
      req.body.organizationId
    );
    const transporter = nodemailer.createTransport({
      host: "smtp.sendgrid.net",
      port: 465,
      auth: {
        user: process.env.SENDGRID_USER,
        pass: process.env.SENDGRID_KEY,
      },
    });
    const mailOptions = {
      from: `CRMX <mail@crmx.fun>`,
      to: req.body.email,
      subject: `You are invited to join ${organization.name} on CRMX`,
      generateTextFromHTML: true,
      text: `Hello there! You have been invited to join the organization ${
        organization.name
      }. Click on your magic link to sign up and start using CRMX: \n\nhttp://localhost:3000/user/invite/${encryptedEmail.replace(
        "/",
        "+"
      )} \n\nHave fun using CRMX!\n\n\nRegards,\nVenkatesh`,
    };
    await transporter.sendMail(mailOptions, async (error, response) => {
      if (error) {
        console.log(error);
      } else {
        res.status(200).send(user);
      }
      transporter.close();
    });
  } catch (err) {
    return next(err);
  }
};

exports.verifyInvite = async (req, res, next) => {
  try {
    const bytes = CryptoJS.AES.decrypt(
      req.body.encryptedEmail.replace("+", "/"),
      process.env.EMAIL_ENCRYPTION_SECRET
    );
    const email = bytes.toString(CryptoJS.enc.Utf8);
    console.log(email);
    const user = await db.User.findOne({ email });
    console.log(req.body.encryptedEmail, user);
    if (!user) {
      return res.status(404).send("User does not exist");
    }
    if (
      user.invited === true &&
      user.encryptedEmail === req.body.encryptedEmail
    ) {
      return res.status(200).send("Verification successful");
    } else {
      return res.status(400).send("Verification failed");
    }
  } catch (err) {
    return next(err);
  }
};
