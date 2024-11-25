//signup.js

const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();

const userModel = require("/Users/Bhuvan K/Desktop/JavaScript Projects/Instagram/database/usermodel.js");
const { STATUS_CODES, API_URLS } = require("./constants.js");

router.use(express.json());

router.post(API_URLS.SIGNUP, async (req, res) => {
  const { email, username, password, phonenumber } = req.body;

  try {
    const existingUser = await userModel.findOne({
      $or: [{ email: email }, { username: username }],
    });
    if (existingUser) {
      return res
        .status(STATUS_CODES.BAD_REQUEST)
        .send({ message: "User with this email or username already exists." });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    let createdUser = await userModel.create({
      email: email,
      username: username,
      password: hashedPassword,
    });
    res
      .status(STATUS_CODES.CREATED)
      .json({ message: `User ${createdUser.username} created successfully` });
  } catch (error) {
    res
      .status(STATUS_CODES.INTERNAL_SERVER_ERROR)
      .json({ message: "Error creating user", error: error.message });
  }
});

module.exports = router;
