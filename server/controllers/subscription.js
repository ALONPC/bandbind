const Subscription = require("../models/subscription");

const all = async (req, res) => {
  const allSubscriptions = await Subscription.find();
  console.log("all -> allSubscriptions", allSubscriptions);
  res.json(allSubscriptions);
};

module.exports = { all };
