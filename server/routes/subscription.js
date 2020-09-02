const express = require("express");
const router = express.Router();

const { all, upgradeSubscription } = require("../controllers/subscription");

router.get("/subscriptions", all);
router.patch("/upgradeSubscription", upgradeSubscription);

module.exports = router;
