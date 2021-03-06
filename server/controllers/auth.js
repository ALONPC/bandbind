const User = require("../models/user");
const jwt = require("jsonwebtoken");
const expressJwt = require("express-jwt");
const moment = require("moment");

const signup = async ({ body: userData }, res) => {
  console.log("signup -> userData", userData);
  const user = new User(userData);
  await user.save((err, user) => {
    err &&
      res.status(400).json({
        error: err.code,
      });

    user.salt = undefined;
    user.hashedPassword = undefined;
    res.json({
      message: "Sign up successfull! Login now to start!",
      user,
    });
  });
};

const login = async ({ body: { email, password } }, res) => {
  await User.findOne(
    {
      email,
    },
    (err, user) => {
      console.log("login -> user", user);
      if (err || !user) {
        return res.status(400).json({
          message: "User not found, please sign up",
          error: true,
        });
      }
      const authenticated = user.authenticate(password);
      console.log("login -> authenticated", authenticated);
      if (!authenticated) {
        return res.status(401).json({
          message: "User password mismatch",
          error: true,
        });
      }
      const token = jwt.sign(
        {
          _id: user._id,
        },
        process.env.SECRET
      );
      const inTwoDays = moment(moment().add("2", "days")).toDate();
      res.cookie("token", token, {
        expire: inTwoDays,
      });
      const { _id, name, email, role, subscription } = user;
      console.log("login -> subscription", subscription);
      return res.json({
        token,
        message: "Login successful! Enjoy",
        user: {
          _id,
          email,
          name,
          role,
          subscription,
        },
      });
    }
  );
};

const logout = (_, res) => {
  res.clearCookie("token");
  res.json({
    message: "Logout successfully! See you around",
  });
};

const requireLogin = expressJwt({
  secret: process.env.SECRET,
  userProperty: "auth",
  algorithms: ["SHA1"],
});

const isAuth = (req, res, next) => {
  let user = req.profile && req.auth && req.profile._id == req.auth._id;
  if (!user) {
    return res.status(403).json({
      error: "Access denied",
    });
  }
  next();
};

const isAdmin = (req, res, next) => {
  if (req.profile.role === "ADMIN") {
    return res.status(403).json({
      error: "Only admin allowed",
    });
  }
  next();
};

module.exports = {
  signup,
  login,
  logout,
  isAdmin,
  isAuth,
  requireLogin,
};
