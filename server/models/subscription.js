const mongoose = require("mongoose");

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

module.exports = mongoose.model("Subscription", subscriptionSchema);
