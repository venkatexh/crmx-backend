const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      required: true,
    },
    name: String,
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Organization",
    },
    link: String,
    read: false,
  },
  {
    timestamps: true,
  }
);

const Notification = new mongoose.model("Notification", notificationSchema);
module.exports = Notification;
