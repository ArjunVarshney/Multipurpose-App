import mongoose from "mongoose";

const commentSchema = mongoose.Schema(
  {
    blog_id: {
      type: String,
      required: true,
    },
    created_by: {
      type: String,
      required: true,
    },
    comment: {
      type: String,
      required: true,
    },
    likes: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const Comment = mongoose.model("Comment", commentSchema);

export default Comment;
