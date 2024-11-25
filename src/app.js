const express = require("express");
const mongoose = require("mongoose");
const loginRoute = require("./login");
const signupRoute = require("./signup");
const { PORTS } = require("./constants.js");

const app = express();

app.use(express.json());

app.use(loginRoute);
app.use(signupRoute);

app.listen(PORTS.SERVER, () => {
  console.log(`Server is running on port ${PORTS.SERVER}`);
});
