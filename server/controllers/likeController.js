import Post from "../Models/PostModel.js";
import User from "../Models/UserModel.js";

export const like = async (req, res) => {
  const body = req.body;
  const id = req.params["postid"];
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
    const likeArr = [...post.likes];
    const dislikeArr = [...post.dislikes];

    if (!likeArr.includes(body.user_id)) {
      await User.findByIdAndUpdate(body.user_id, { $push: { liked: id } });
    }

    likeArr.splice(likeArr.indexOf(body.user_id), 1);
    dislikeArr.splice(dislikeArr.indexOf(body.user_id), 1);
    likeArr.push(body.user_id);

    const updatedPost = await Post.findByIdAndUpdate(post._id, {
      likes: likeArr,
      dislikes: dislikeArr,
    });
    res.status(200).json({
      success: true,
      data: updatedPost,
    });
  } catch (err) {
    res.status(400).json({
      success: true,
      reason: "Some error occurred",
    });
  }
};

export const dislike = async (req, res) => {
  const body = req.body;
  const id = req.params["postid"];
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
    const likeArr = [...post.likes];
    const dislikeArr = [...post.dislikes];

    if (likeArr.includes(body.user_id)) {
      await User.findByIdAndUpdate(body.user_id, { $pull: { liked: id } });
    }

    likeArr.splice(likeArr.indexOf(body.user_id), 1);
    dislikeArr.splice(dislikeArr.indexOf(body.user_id), 1);
    dislikeArr.push(body.user_id);

    const updatedPost = await Post.findByIdAndUpdate(post._id, {
      likes: likeArr,
      dislikes: dislikeArr,
    });
    res.status(200).json({
      success: true,
      data: updatedPost,
    });
  } catch (err) {
    res.status(400).json({
      success: true,
      reason: "Some error occurred",
    });
  }
};
