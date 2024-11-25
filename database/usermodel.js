//usermodel.js

const mongoose = require("mongoose");

mongoose
  .connect(`mongodb://127.0.0.1:27017/instagram-clone`)
  .then(() => {
    console.log("Database connection successful");
  })
  .catch((error) => {
    console.error("Database connection error:", error);
  });

const userSchema = mongoose.Schema({
  email: { type: String, required: true, unique: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phonenumber: { type: Number, required: true },
});

module.exports = mongoose.model("User", userSchema);
