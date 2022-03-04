const mongoose = require("mongoose");

const activitySchema = new mongoose.Schema({
  type: String,
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Organization",
  },
  campaignName: String,
  refId: String,
  text: String,
  doneAt: Date,
});

const Activity = mongoose.model("Activity", activitySchema);
module.exports = Activity;
