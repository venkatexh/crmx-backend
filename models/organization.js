const mongoose = require("mongoose");

const organizationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
});

const Organization = new mongoose.model("Organization", organizationSchema);
module.exports = Organization;
