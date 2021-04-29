require("dotenv").config();
const { users, subscriptions, artists } = require("./bandbindDb");
const Artist = require("../models/artist");
const User = require("../models/user");
const Subscription = require("../models/subscription");
const { connectDb } = require("./connect");

const run = async () => {
  try {
    await connectDb();
    await User.insertMany(users);
    await Artist.insertMany(artists);
    await Subscription.insertMany(subscriptions);
  } catch (err) {
    console.log(err.stack);
  }
};
// run();
run().catch(console.dir);
