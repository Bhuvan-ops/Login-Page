// guest.js

const express = require("express");
const router = express.Router();

const { STATUS_CODES, API_URLS } = require("./constants.js");

router.use(express.json());

router.get(API_URLS.GUEST, async (req, res) => {});

module.exports = router;
