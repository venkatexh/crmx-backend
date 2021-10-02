const db = require("../models");
const nodemailer = require("nodemailer");

exports.sendCampaign = async (req, res, next) => {
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.sendgrid.net",
      port: 465,
      auth: {
        user: process.env.SENDGRID_USER,
        pass: process.env.SENDGRID_KEY,
      },
    });
    const mailOptions = {
      from: `${req.body.from} <mail@crmx.fun>`,
      to: req.body.sentTo,
      subject: "Node.js Email with Secure OAuth",
      generateTextFromHTML: true,
      html: "<b>test</b>",
    };
    transporter.sendMail(mailOptions, (error, response) => {
      error
        ? console.log(error)
        : res.status(200).json({ message: "Mail sent" });
      transporter.close();
    });
  } catch (err) {
    return next(err);
  }
};
