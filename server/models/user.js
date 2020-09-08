const mongoose = require("mongoose");
const CryptoJS = require("crypto-js");
const { v1: uuidv1 } = require("uuid");

const subscriptionSchema = new mongoose.Schema({
  plan: {
    type: String,
    enum: ["MONTHLY", "YEARLY", "4LIFE"],
  },
  active: {
    type: Boolean,
  },
  price: {
    type: Number,
  },
  currency: {
    type: String,
  },
  discount: {
    type: Number,
  },
  description: {
    type: String,
  },
});

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: true,
    maxlength: 32,
  },
  email: {
    type: String,
    trim: true,
    required: true,
    unique: true,
  },
  hashedPassword: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["ADMIN", "USER"],
  },
  subscription: {
    type: subscriptionSchema,
  },
  // subscription: {
  //   type: mongoose.Types.ObjectId,
  //   ref: "Subscription",
  // },
});

userSchema
  .virtual("password")
  .set(function (password) {
    this._password = password;
    this.salt = uuidv1();
    this.hashedPassword = this.encryptPassword(password);
  })
  .get(function () {
    return this._password;
  });

userSchema.methods = {
  authenticate: function (plainText) {
    return this.encryptPassword(plainText) === this.hashedPassword;
  },

  encryptPassword: function (password) {
    if (!password) return "";
    try {
      const hashedPassword = CryptoJS.HmacSHA1(password, process.env.SECRET);
      const encryptedPassword = CryptoJS.enc.Base64.stringify(hashedPassword);
      return encryptedPassword;
    } catch (err) {
      return "An error ocurred when hashing password";
    }
  },
};

module.exports = mongoose.model("User", userSchema);
