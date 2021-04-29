const mongoose = require("mongoose");

const connectDb = async () => {
  const connection = await mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  });
  if (!connection) {
    console.log("Couldn't connect to database");
  }
  console.log("Connected to the database");
  return connection;
};

module.exports = { connectDb };
