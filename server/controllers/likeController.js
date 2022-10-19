import Post from "../Models/PostModel.js";
import User from "../Models/UserModel.js";

export const like = async (req, res) => {
  const body = req.body;
  const id = req.params["postid"];
  let updatedPost = {};
  if (!id || !body) {
    res.status(400).json({
      success: false,
      reason: "Please send complete information",
    });
  }
  try {
    const post = await Post.findById(id);
    if (!post)
      res.status(400).json({
        success: false,
        reason: "Post not found in the database",
      });

    if (
      !post.likes.includes(body.user_id) &&
      !post.dislikes.includes(body.user_id)
    ) {
      updatedPost = await Post.findByIdAndUpdate(id, {
        $push: { likes: body.user_id },
      });
      await User.findByIdAndUpdate(body.user_id, { $push: { liked: id } });
    } else if (
      !post.likes.includes(body.user_id) &&
      post.dislikes.includes(body.user_id)
    ) {
      updatedPost = await Post.findByIdAndUpdate(id, {
        $push: { likes: body.user_id },
        $pull: { dislikes: body.user_id },
      });
      await User.findByIdAndUpdate(body.user_id, {
        $push: { liked: id },
      });
    } else {
      updatedPost = await Post.findByIdAndUpdate(id, {
        $pull: { likes: body.user_id },
      });
      await User.findByIdAndUpdate(body.user_id, { $pull: { liked: id } });
    }

    res.status(200).json({
      success: true,
      data: updatedPost,
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      success: false,
      reason: err,
    });
  }
};

export const dislike = async (req, res) => {
  const body = req.body;
  const id = req.params["postid"];
  let updatedPost = {};
  if (!id || !body) {
    res.status(400).json({
      success: false,
      reason: "Please send complete information",
    });
  }
  try {
    const post = await Post.findById(id);
    if (!post)
      res.status(400).json({
        success: false,
        reason: "Post not found in the database",
      });

    if (
      !post.dislikes.includes(body.user_id) &&
      !post.likes.includes(body.user_id)
    ) {
      updatedPost = await Post.findByIdAndUpdate(id, {
        $push: { dislikes: body.user_id },
      });
    } else if (
      !post.dislikes.includes(body.user_id) &&
      post.likes.includes(body.user_id)
    ) {
      updatedPost = await Post.findByIdAndUpdate(id, {
        $push: { dislikes: body.user_id },
        $pull: { likes: body.user_id },
      });
      await User.findByIdAndUpdate(body.user_id, { $pull: { liked: id } });
    } else {
      updatedPost = await Post.findByIdAndUpdate(id, {
        $pull: { dislikes: body.user_id },
      });
    }
    res.status(200).json({
      success: true,
      data: updatedPost,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      reason: err,
    });
  }
};
