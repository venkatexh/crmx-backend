const mongoose = require("mongoose");

const organizationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  orgInternalId: {
    type: String,
    immutable: true,
    unique: true,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  contacts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Contact",
    },
  ],
  campaigns: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Campaign",
    },
  ],
  tags: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Tag",
    },
  ],
  billing_address: {
    line1: String,
    line2: String,
    postal_code: String,
    city: String,
    state: String,
    country: String,
  },
  plan: {
    name: {
      type: String,
      default: "Free",
    },
    amount: String,
    rate: String,
    billDate: String,
  },
  admins: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  invitedAdmins: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "USer",
    },
  ],
  bills: [],
});

const Organization = new mongoose.model("Organization", organizationSchema);
module.exports = Organization;
