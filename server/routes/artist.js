const express = require("express");
const router = express.Router();

const {
  all,
  find,
  getAllArtistEvents,
  getAllEvents,
} = require("../controllers/artist");

router.get("/artists", all);
// router.get("/artist", find);
router.get("/artist/:name", find);
router.get("/artist/:name/events", getAllArtistEvents);
router.get("/events", getAllEvents);

module.exports = router;
