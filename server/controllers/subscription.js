const User = require("../models/user");
const Subscription = require("../models/subscription");

const all = async (req, res) => {
  const allSubscriptions = await Subscription.find();
  res.json(allSubscriptions);
};

const upgradeSubscription = async ({ body: { _id, plan } }, res) => {
  await User.findByIdAndUpdate(
    _id,
    {
      subscription: { plan, active: true },
    },
    { new: true, useFindAndModify: false },
    (err, updatedUserWithSubscription) => {
      if (err) {
        return res.status(403).json({
          error: err,
        });
      } else {
        res.json({
          message: "Subscription upgraded successfully!",
          updatedUserWithSubscription,
        });
      }
    }
  );
};

module.exports = { all, upgradeSubscription };
