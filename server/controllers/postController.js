import Post from "../Models/PostModel.js";

//create a post
export const createPost = async (req, res) => {
  try {
    const details = req.body;
    const newPost = new Post(details);
    const savedPost = await newPost.save();
    if (!savedPost) {
      res.status(400).json({
        success: false,
        data: "Cannot track post status",
      });
    }
    res.status(200).json({
      success: true,
      data: savedPost,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      reason: error,
    });
  }
};

// get a single post
export const getPost = async (req, res) => {
  try {
    const id = req.params["id"];
    const post = await Post.findById(id);
    if (!post) {
      res.status(400).json({
        success: false,
        reason: "The Post does not exists in the database",
      });
    }
    res.status(200).json({
      success: true,
      data: post,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      reason: error,
    });
  }
};

// updata a single post
export const updatePost = async (req, res) => {
  try {
    const id = req.params["id"];
    const changes = req.body;
    const updatedPost = await Post.findByIdAndUpdate({ _id: id }, changes, {
      returnDocument: "after",
    });
    if (!updatedPost) {
      res.status(400).json({
        success: false,
        reason: "Updated post not found",
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

// delete single post
export const deletePost = async (req, res) => {
  try {
    const id = req.params["id"];
    const deletedPost = await Post.findByIdAndDelete(id, { rawResult: true });
    if (!deletedPost) {
      res.status(400).json({
        success: false,
        reason: "Cannot track delete status",
      });
    }
    res.status(200).json({
      success: true,
      data: deletedPost,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      reason: error,
    });
  }
};

// show all post for testing
export const getAllPost = async (req, res) => {
  try {
    const allPosts = await Post.find();
    res.status(200).json({
      success: true,
      data: allPosts,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      reason: err,
    });
  }
};
