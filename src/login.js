// login.js

const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();

const userModel = require("/Users/Bhuvan K/Desktop/JavaScript Projects/Instagram/database/usermodel.js");
const { STATUS_CODES, API_URLS } = require("./constants.js");

router.use(express.json());

router.post(API_URLS.LOGIN, async (req, res) => {
  const { username, password, email, phonenumber } = req.body;

  if ((!username && !email && !phonenumber) || !password) {
    return res
      .status(STATUS_CODES.BAD_REQUEST)
      .json({ message: "Missing required fields." });
  }

  try {
    let loginUser;

    if (username) {
      loginUser = await userModel.findOne({ username });
    } else if (email) {
      loginUser = await userModel.findOne({ email });
    } else if (phonenumber) {
      loginUser = await userModel.findOne({ phonenumber });
    }

    if (!loginUser) {
      return res
        .status(STATUS_CODES.BAD_REQUEST)
        .json({ message: "Invalid input credentials." });
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
