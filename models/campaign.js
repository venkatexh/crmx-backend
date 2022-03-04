const mongoose = require("mongoose");

const campaignSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      default: "draft",
    },
    scheduledAt: String,
    from: String,
    sentTo: [],
    recipients: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Contact",
      },
    ],
    sentAt: Date,
    subject: String,
    text: String,
    html: String,
    campaignUrl: String,
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Organization",
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    tags: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Tag",
      },
    ],
  },
  { timestamps: true }
);

const Campaign = mongoose.model("Campaign", campaignSchema);
module.exports = Campaign;
