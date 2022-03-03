const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: String,
  email: {
    type: String,
    unique: true,
    required: true,
  },
  company: String,
  plan: {
    name: {
      type: String,
      default: "Free"
    },
    amount: String,
    rate: String,
    billDate: String,
  },
  password: {
    type: String,
  },
  billing_address: {
    line1: String,
    line2: String,
    postal_code: String,
    city: String,
    state: String,
    country: String
  },
  googleIdToken: {
    type: String,
    unique: true,
  },
  googleAccessToken: {
    type: String,
    unique: true,
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
  bills: []
});

userSchema.pre("save", async function (next) {
  try {
    if (!this.isModified("password")) {
      return next();
    }
    this.password = await bcrypt.hash(this.password, 10);
    return next();
  } catch (err) {
    return next(err);
  }
});

userSchema.methods.comparePassword = async function (candidate, next) {
  try {
    return bcrypt.compare(candidate, this.password);
  } catch (err) {
    return next(err);
  }
};

const User = mongoose.model("User", userSchema);
module.exports = User;
