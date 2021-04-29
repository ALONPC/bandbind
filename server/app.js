const express = require("express");
const morgan = require("morgan");

const app = express();
// const jwt = require("express-jwt");
// const jsonwebtoken = require("jsonwebtoken");
const cors = require("cors");

require("dotenv").config();

const artistsRoutes = require("./routes/artist");
const authRoutes = require("./routes/auth");
const subscriptionRoutes = require("./routes/subscription");
const { connectDb } = require("./database/connect");

connectDb();
// Middlewares
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// Routing
app.use("/api", artistsRoutes);
app.use("/api", authRoutes);
app.use("/api", subscriptionRoutes);

const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`Server running on port ${port} 🤘`);
});
