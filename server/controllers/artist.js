const Artist = require("../models/artist.js");

const all = async (req, res) => {
  const allArtists = await Artist.find();
  res.json(allArtists);
};

const find = async (req, res) => {
  // const artist = await Artist.findOne({
  //   name: { $regex: `^${req.params.searchValue}$`, $options: "i" },
  // });
  console.log("find -> req.params", req.params);
  const artist = await Artist.findOne({ name: req.params.name });
  console.log("find -> artist", artist.name);
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
