import mongoose from "mongoose";

const tagSchema = mongoose.Schema({
  tag_name: {
    type: String,
    required: true,
  },
  score: {
    type: Number,
    required: true,
    default: 0,
  },
  posts: [String],
  related: [String],
});

const Tag = mongoose.model("Tag", tagSchema);

export default Tag;
