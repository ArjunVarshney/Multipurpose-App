import Post from "../Models/PostModel.js";
import { autoSaveTags } from "./tagControllers.js";

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
    autoSaveTags(savedPost);
  } catch (error) {
    res.status(400).json({
      success: false,
      reason: error,
    });
  }
};

//search a post in database
export const searchPost = async (req, res) => {
  try {
    const searchQuery = req.query.q;
    const sort = req.query.sort;
    const onlytags = req.query.onlytags;
    let sortedPosts = [];
    if (sort == "latest") {
      sortedPosts = await Post.find().sort({ updatedAt: -1 });
    } else {
      sortedPosts = await Post.find().sort({ score: -1 });
    }
    const reg = new RegExp(searchQuery, "i");
    const posts = sortedPosts.filter(
      (post) =>
        reg.test(post.title) ||
        reg.test(post.subject) ||
        reg.test(post.tags) ||
        reg.test(post.url) ||
        reg.test(post.content)
    );
    let tags = [];
    if (onlytags == "true") {
      posts.forEach((post) => {
        tags = [...new Set([...tags, ...post.tags])];
      });
    }
    if (!posts) {
      res.status(400).json({
        success: false,
        reason: "No such post found",
      });
    }
    res.status(200).json({
      success: true,
      data: onlytags == "true" ? tags : posts,
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
    const url = req.params["url"];
    const post = await Post.findOne({ url });
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

export const getPostById = async (req, res) => {
  try {
    const id = req.params["id"];
    const post = await Post.findById(id).select({
      title: 1,
      created_by: 1,
      url: 1,
    });
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

// get paginated posts
export const getPaginatedPost = async (req, res) => {
  const page = parseInt(req.params["page"]);
  const postPerPage = 10;
  try {
    const post = await Post.find()
      .sort({ updatedAt: -1 })
      .skip(page * postPerPage)
      .limit(postPerPage)
      .select({
        polls: 0,
        score: 0,
      });
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

// get trending posts
export const getTrendingPost = async (req, res) => {
  try {
    const trendingPosts = await Post.find().sort({ score: -1 }).limit(10);
    if (!trendingPosts) {
      res.status(400).json({
        success: false,
        reason: "The posts do not exist in the database",
      });
    }
    res.status(200).json({
      success: true,
      data: trendingPosts,
    });
  } catch (error) {}
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
