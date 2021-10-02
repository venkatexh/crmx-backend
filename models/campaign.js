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
  from: {
    type: String,
    required: true,
  },
  sentTo: [],
  sentAt: String,
  subject: String,
  text: String,
  html: String,
  campaignUrl: String,
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  tags: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Tag",
    },
  ],
});

const Campaign = mongoose.model("Campaign", campaignSchema);
module.exports = Campaign;
