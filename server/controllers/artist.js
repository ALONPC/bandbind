const Artist = require("../models/artist.js");

const all = async (req, res) => {
  const allArtists = await Artist.find();
  res.json(allArtists);
};

const find = async (req, res) => {
  const searchValue = req.params.name;
  const artist = await Artist.findOne({
    name: { $regex: searchValue, $options: "i" },
  });
  res.json(artist);
};

const getAllArtistEvents = async (req, res) => {
  const foundArtist = await Artist.findOne({ name: req.params.name }).select(
    "-_id -genres -name -imageUrl -url"
  );
  res.json(foundArtist);
};

const getAllEvents = async (req, res) => {
  const allEvents = await Artist.find().select("-_id -genres -url");
  res.json(allEvents);
};

module.exports = { all, find, getAllArtistEvents, getAllEvents };
