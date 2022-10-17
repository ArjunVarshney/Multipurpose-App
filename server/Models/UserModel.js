import mongoose from "mongoose";
import crypto from "crypto";

const random = crypto.randomBytes(10).toString("hex");

const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    default: `User#${random}`,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  joined_at: {
    type: Date,
    default: Date.now,
  },
  small_intro: {
    type: String,
    required: true,
    default: "wrote a blog on YOUR NORM",
  },
  description: {
    type: String,
    required: true,
    default: "YOUR NORM user",
  },
  image_url: {
    type: String,
    required: true,
    default:
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png",
  },
  saved: [String],
  liked: [String],
  comments: [String],
});

const User = mongoose.model("User", userSchema);

export default User;
