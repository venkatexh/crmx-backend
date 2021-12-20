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
    const campaign = await db.Campaign.findById(req.body.campaignId);
    console.log(campaign)
    const mailOptions = {
      from: `${campaign.from} <mail@crmx.fun>`,
      bcc: campaign.sentTo,
      subject: campaign.subject,
      generateTextFromHTML: true,
      text: campaign.text,
      html: campaign.html
    };
    await transporter.sendMail(mailOptions, (error, response) => {
      if (error) {
        console.log(error)
      } else {
        campaign.sentAt = Date.now();
        campaign.status = "Sent";
        res.status(200).json({message: "Campaign sent"});
      }
      transporter.close();
    });
  } catch (err) {
    return next(err);
  }
};
