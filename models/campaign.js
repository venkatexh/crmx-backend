const mongoose = require("mongoose");

const campaignSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    default: "draft",
  },
  scheduledAt: String,
  sentTo: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Contact",
    },
  ],
  sentAt: String,
  subject: String,
  text: String,
  html: String,
  campaignUrl: String,
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

const Campaign = mongoose.model("Campaign", campaignSchema);
module.exports = Campaign;
