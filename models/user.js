const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
  },
  lastName: String,
  email: {
    type: String,
    unique: true,
    required: true,
  },
  encryptedEmail: String,
  organizationId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Organization",
  },
  password: {
    type: String,
  },
  verified: {
    type: Boolean,
    default: false,
  },
  invited: {
    type: Boolean,
    default: false,
  },
  googleIdToken: {
    type: String,
    required: false,
    default: "",
  },
  googleAccessToken: {
    type: String,
    required: false,
    default: "",
  },
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
