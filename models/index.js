const mongoose = require("mongoose");

const pwd = process.env.MONGO_PWD;

mongoose.connect(
  `mongodb+srv://venkatesh:${pwd}@mycluster.fyzgz.mongodb.net/crmx?retryWrites=true&w=majority`,
  {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  }
);

module.exports.User = require("./user");
module.exports.contact = require("./contact");
