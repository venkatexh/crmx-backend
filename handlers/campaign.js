const db = require("../models");
const notifications = require("../services/notifications");

exports.createCampaign = async (req, res, next) => {
  try {
    let foundOrg = await db.Organization.findById(req.query.org_id);
    let orgCampaigns = await db.Campaign.find({ owner: req.query.org_id });
    let duplicate = false;
    await orgCampaigns.forEach((campaign) => {
      if (campaign.name === req.body.name) {
        duplicate = true;
      }
    });
    if (duplicate) {
      return res
        .status(400)
        .json({ message: "Campaign with same name already exists." });
    } else {
      const emails = [];
      const contacts = [];
      for (const id of req.body.tags) {
        const tag = await db.Tag.findById(id);
        for (const id in tag.contacts) {
          const contact = await db.Contact.findById(
            tag.contacts[id].toString()
          );
          if (!contacts.includes(contact.id)) {
            contacts.push(contact.id);
          }
          if (!emails.includes(contact.email)) {
            emails.push(contact.email);
          }
        }
      }
      const {
        name,
        status,
        scheduledAt,
        sentAt,
        subject,
        text,
        html,
        tags,
        from,
      } = req.body;
      let campaign = await db.Campaign.create({
        name,
        status,
        scheduledAt,
        sentTo: emails,
        sentAt,
        recipients: contacts,
        subject,
        text,
        html,
        tags,
        from,
        owner: req.query.org_id,
        createdBy: req.query.user_id,
      });
      foundOrg.campaigns.push(campaign.id);
      foundOrg.save();
      let notification = await db.Notification.create({
        type: "campaign_created",
        name: campaign.name,
        owner: req.query.org_id,
      });
      await notifications(
        foundOrg.orgInternalId,
        "notifications",
        notification
      );
      return res.status(200).json(campaign);
    }
  } catch (err) {
    if (err.Code === 11000) {
      err.message = "Campaign with same name already exists.";
    }
    return next({
      status: 400,
      message: err.message,
    });
  }
};

exports.getOrgCampaigns = async (req, res, next) => {
  try {
    let campaigns = await db.Campaign.find({ owner: req.query.org_id });
    return res.status(200).json(campaigns);
  } catch (err) {
    return next(err);
  }
};

exports.getCampaign = async (req, res, next) => {
  try {
    let campaign = await db.Campaign.findById(req.params.id);
    const tags = [];
    for (const idx in campaign.tags) {
      let tag = await db.Tag.findById(campaign.tags[idx]);
      tags.push(tag);
    }
    campaign.tags = tags;
    return res.status(200).json(campaign);
  } catch (err) {
    return next(err);
  }
};
