const express = require("express");
const router = express.Router();

const { signup, login, logout } = require("../controllers/auth");
const { check, validationResult } = require("express-validator");

const signupValidation = (req, res, next) => {
  check("name", "Name is required").notEmpty();
  check("email", "Email must be between 3 to 32 characters")
    .matches(/.+\@.+\..+/)
    .isLength({
      min: 4,
      max: 32,
    });
  check("password", "Password is required").isLength({ min: 8 }).notEmpty();
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

router.post("/signup", signupValidation, signup);
router.post("/login", login);
router.get("/logout", logout);

module.exports = router;
