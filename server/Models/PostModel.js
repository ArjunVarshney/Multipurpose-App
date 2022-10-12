import mongoose from "mongoose";

const postSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    content: {
      type: String,
      required: true,
      unique: true,
    },
    created_by: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
      unique: true,
    },
    image_url: {
      type: String,
      required: true,
      default: "https://source.unsplash.com/random",
    },
    likes: {
      type: Number,
      required: true,
      default: 0,
    },
    dislikes: {
      type: Number,
      required: true,
      default: 0,
    },
    comments: [
      {
        comment: String,
        user_id: String,
        date: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    tags: [String],
    polls: [{ poll_id: String }],
    score: {
      type: Number,
      required: true,
      default: 10000,
    },
  },
  {
    timestamps: true,
  }
);

const Post = mongoose.model("Post", postSchema);

export default Post;
