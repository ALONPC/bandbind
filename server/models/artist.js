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
    unique: true,
    required: true,
  },
  genres: [
    {
      type: String,
    },
  ],
  imageUrl: {
    type: String,
    required: true,
  },
  url: {
    type: String,
  },
  events: [eventSchema],
});

module.exports = mongoose.model("Artist", artistSchema);
