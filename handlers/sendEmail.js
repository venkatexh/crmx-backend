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
    const mailOptions = {
      from: `${campaign.from} <mail@crmx.fun>`,
      bcc: campaign.sentTo,
      subject: campaign.subject,
      generateTextFromHTML: true,
      text: campaign.text,
      html: campaign.html
    };
    await transporter.sendMail(mailOptions, async (error, response) => {
      if (error) {
        console.log(error)
      } else {
        campaign.sentAt = Date.now();
        campaign.status = "Sent";
        await campaign.save();
        for (const id in campaign.recipients) {
          const contact = await db.Contact.findById(campaign.recipients[id]);
          const activity = await db.Activity.create({
            type: 'Campaign',
            owner: campaign.owner,
            campaignName: campaign.name,
            refId: campaign.id.toString(),
            doneAt: Date.now()
          })
          contact.activities.push(activity.id);
          await contact.save();
        }
        res.status(200).json({message: "Campaign sent"});
      }
      transporter.close();
    });
  } catch (err) {
    return next(err);
  }
};
