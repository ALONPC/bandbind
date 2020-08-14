const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  date: {
    type: Date,
  },
  place: {
    type: String,
  },
  status: {
    type: Boolean,
  },
});

const artistSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  genres: [
    {
      type: String,
    },
  ],
  imageUrl: {
    type: String,
  },
  url: {
    type: String,
  },
  events: [eventSchema],
});

module.exports = mongoose.model("Artist", artistSchema);
