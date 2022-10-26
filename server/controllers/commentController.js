import Comment from "../Models/CommentModel.js";
import Post from "../Models/PostModel.js";
import User from "../Models/UserModel.js";

// for testing
export const getAllComments = async (req, res) => {
  const response = await Comment.find();
  res.status(200).json(response);
};

export const postComment = async (req, res) => {
  try {
    const body = req.body;
    // save to comment database
    const newComment = new Comment(body);
    const savedComment = await newComment.save();

    if (!savedComment) {
      res.status(500).json({
        success: false,
        reason: "Could not save comment to database",
      });
    }

    // save the id to user database
    const updatedUser = await User.findByIdAndUpdate(body.created_by, {
      $push: { comments: savedComment._id },
    });

    if (!updatedUser) {
      res.status(500).json({
        success: false,
        reason: "Could not save comment to user Model",
      });
    }

    // save the id to blog database
    const updatedBlog = await Post.findByIdAndUpdate(body.blog_id, {
      $push: { comments: savedComment._id },
    });

    if (!updatedBlog) {
      res.status(500).json({
        success: false,
        reason: "Could not save comment to blog Model",
      });
    }

    res.status(200).json({
      success: true,
      data: savedComment,
    });
  } catch (error) {
    res.status(200).json({
      success: false,
      reason: error,
    });
  }
};

export const getSingleComment = async (req, res) => {
  try {
    const id = req.params["id"];
    const comment = await Comment.findById(id);
    if (!comment) {
      res.status(400).json({
        success: false,
        reason: "The comment does not exists in the database",
      });
    }
    res.status(200).json({
      success: true,
      data: comment,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      reason: error,
    });
  }
};

export const getBlogComments = async (req, res) => {
  try {
    const blog_id = req.params["blogid"];
    if (!blog_id) {
      res.status(400).json({
        success: false,
        reason: "No blog found",
      });
    }
    const comments = await Comment.find({ blog_id }).sort({ likes: 1 });
    if (comments) {
      res.status(200).json({
        success: true,
        data: comments,
      });
      return;
    }
    res.status(400).json({
      success: false,
      reason: "No Comment found",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      reason: error,
    });
  }
};

export const likeComment = async (req, res) => {
  try {
    const comment_id = req.params["commentid"];
    const user_id = req.body.user_id;
    if (!comment_id && !user_id) {
      res.status(400).json({
        success: false,
        reason: "Please send complete information",
      });
    }
    let comment = await Comment.findById(comment_id);
    if (!comment) {
      res.status(400).json({
        success: false,
        reason: "Comment was not found in the database",
      });
    }

    if (!comment.likes.includes(user_id)) {
      comment = await Comment.findByIdAndUpdate(comment_id, {
        $push: { likes: user_id },
      });
    } else {
      comment = await Comment.findByIdAndUpdate(comment_id, {
        $pull: { likes: user_id },
      });
    }

    res.status(200).json({
      success: true,
      data: comment,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      reason: error,
    });
  }
};
