const mongoose = require("mongoose");
const User = require("./user");

const contactSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    status: String,
    firstName: String,
    lastName: String,
    location: String,
    language: String,
    tags: [{ type: mongoose.Schema.Types.ObjectId, ref: "Tag" }],
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Organization",
    },
    addedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    activities: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Activity",
      },
    ],
  },
  { timestamps: true }
);

contactSchema.pre("remove", async function (next) {
  try {
    let user = await User.findById(this.user);
    user.contacts.remove(this.id);
    await user.save();
    return next();
  } catch (err) {
    return next(err);
  }
});

const Contact = mongoose.model("Contact", contactSchema);
module.exports = Contact;
