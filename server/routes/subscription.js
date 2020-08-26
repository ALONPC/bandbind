const express = require("express");
const router = express.Router();

const { all } = require("../controllers/subscription");

router.get("/subscriptions", all);

module.exports = router;
