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

const postSchema = mongoose.Schema({
  postNumber: {
    type: Number,
    required: true,
  },
  postedDate: {
    type: Date,
    default: Date.now,
  },
  postDescription: {
    type: String,
    required: true,
  },
});

const userSchema = mongoose.Schema({
  email: { type: String, required: [true, "Email is required"], unique: true },
  username: {
    type: String,
    required: [true, "Username is required"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    minlength: 6,
  },
  phonenumber: {
    type: Number,
    minlength: 10,
    maxlength: 10,
    required: [true, "Phone number is required"],
    unique: true,
  },
  posts: {
    type: [postSchema],
    default: [],
  },
});

module.exports = mongoose.model("User", userSchema);
