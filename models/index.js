const mongoose = require("mongoose");

const pwd = process.env.MONGO_PWD;

mongoose.connect(
  `mongodb+srv://venkatesh:${pwd}@mycluster.fyzgz.mongodb.net/crmx?retryWrites=true&w=majority`
);
module.exports.User = require("./user");
module.exports.Contact = require("./contact");
module.exports.Campaign = require("./campaign");
module.exports.Tag = require("./tag");
module.exports.Activity = require('./activity');
