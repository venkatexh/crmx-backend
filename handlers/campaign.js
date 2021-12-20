const db = require("../models");

exports.createCampaign = async (req, res, next) => {
  try {
    let foundUser = await db.User.findById(req.params.id);
    let userCampaigns = await db.Campaign.find({ owner: req.params.id });
    console.log(userCampaigns);
    let duplicate = false;
    await userCampaigns.forEach((campaign) => {
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
      for (const id of req.body.tags) {
        const tag = await db.Tag.findById(id);
        tag.contacts.forEach(contact => {
          emails.push(contact)
        });
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
        from
      } = req.body;
      let campaign = await db.Campaign.create({
        name,
        status,
        scheduledAt,
        sentTo: emails,
        sentAt,
        subject,
        text,
        html,
        tags,
        from,
        owner: req.params.id,
      });
      foundUser.campaigns.push(campaign.id);
      foundUser.save();
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

exports.getUserCampaigns = async (req, res, next) => {
  try {
    let campaigns = await db.Campaign.find({ owner: req.params.id });
    return res.status(200).json(campaigns);
  } catch (err) {
    return next(err);
  }
};
