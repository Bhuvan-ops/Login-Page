// login.js

const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();

const userModel = require("/Users/Bhuvan K/Desktop/JavaScript Projects/Instagram/database/usermodel.js");
const { STATUS_CODES, API_URLS } = require("./constants.js");

router.use(express.json());

router.post(API_URLS.LOGIN, async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res
      .status(STATUS_CODES.BAD_REQUEST)
      .json({ message: "Missing required fields." });
  }

  try {
    const loginUser = await userModel.findOne({ username });

    if (!loginUser) {
      return res
        .status(STATUS_CODES.BAD_REQUEST)
        .json({ message: "Invalid username." });
    }

    const isMatch = await bcrypt.compare(password, loginUser.password);

    if (isMatch) {
      return res
        .status(STATUS_CODES.SUCCESS)
        .json({ message: "Login successful" });
    } else {
      return res
        .status(STATUS_CODES.BAD_REQUEST)
        .json({ message: "Invalid credentials." });
    }
  } catch (error) {
    console.error("Error during login:", error);
    return res
      .status(STATUS_CODES.INTERNAL_SERVER_ERROR)
      .json({ message: "Internal server error.", error: error.message });
  }
});

module.exports = router;
