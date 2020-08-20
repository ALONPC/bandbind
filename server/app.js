require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const app = express();
// const jwt = require("express-jwt");
// const jsonwebtoken = require("jsonwebtoken");
const cors = require("cors");

const artistsRoutes = require("./routes/artist");
const authRoutes = require("./routes/auth");

// Connection DB
mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("DB Connected"));
// Middlewares
app.use(cors());
app.use(express.json());

// Routing
app.use("/api", artistsRoutes);
app.use("/api", authRoutes);

const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log(`Server running on port ${port} 🤘`);
});
