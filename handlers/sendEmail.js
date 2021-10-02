const db = require("../models");
const nodemailer = require("nodemailer");
const schedule = require("node-schedule");

const transporter = nodemailer.createTransport({
  host: "smtp.sendgrid.net",
  port: 465,
  auth: {
    user: process.env.SENDGRID_USER,
    pass: process.env.SENDGRID_KEY,
  },
});

exports.sendCampaign = async (req, res, next) => {
  try {
    const campaign = await db.Campaign.findById(req.body.campaignId);
    const mailOptions = {
      from: `${campaign.from} <mail@crmx.fun>`,
      to: campaign.sentTo,
      subject: campaign.subject,
      text: campaign.text,
      html: campaign.html,
    };
    await transporter.sendMail(mailOptions, async (error, response) => {
      if (error) {
        console.log(error);
      } else {
        await db.Campaign.findByIdAndUpdate(req.body.campaignId, {
          sentAt: new Date(),
        });
        await db.Campaign.findByIdAndUpdate(req.body.campaignId, {
          status: "sent",
        });
        return res.status(200).json({ message: "Mail sent" });
      }
    });
  } catch (err) {
    return next(err);
  }
};

exports.scheduleCampaign = async (req, res, next) => {
  try {
    const campaign = await db.Campaign.findById(req.body.campaignId);
    const mailOptions = {
      from: `${campaign.from} <mail@crmx.fun>`,
      to: campaign.sentTo,
      subject: campaign.subject,
      text: campaign.text,
      html: campaign.html,
    };
    await schedule.scheduleJob(req.body.sendAt, async () => {
      await transporter.sendMail(mailOptions, async (error, response) => {
        if (error) {
          console.log(error);
        } else {
          await db.Campaign.findByIdAndUpdate(req.body.campaignId, {
            sentAt: req.body.sendAt,
          });
          await db.Campaign.findByIdAndUpdate(req.body.campaignId, {
            status: "sent",
          });
        }
      });
    });
    await db.Campaign.findByIdAndUpdate(req.body.campaignId, {
      status: "scheduled",
    });
    return res.status(200).json("Campaign scheduled.");
  } catch (err) {
    return next(err);
  }
};
