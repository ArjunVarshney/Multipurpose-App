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
    likes: [String],
  },
  {
    timestamps: true,
  }
);

const Comment = mongoose.model("Comment", commentSchema);

export default Comment;
