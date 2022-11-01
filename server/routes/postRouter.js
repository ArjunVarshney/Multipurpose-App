import express from "express";
import commentRouter from "./commentRouter.js";
import tagRouter from "./tagRouter.js";
import {
  createPost,
  deletePost,
  getAllPost,
  getPost,
  getTrendingPost,
  getPaginatedPost,
  searchPost,
  updatePost,
  getPostById,
} from "../controllers/postController.js";
import { like, dislike } from "../controllers/likeController.js";
import { authorize } from "../middleware/authorizeUser.js";

const postRouter = express.Router();

// for testing
postRouter.get("/", getAllPost);

//crud operations
postRouter.get("/getPage/:page", getPaginatedPost);
postRouter.get("/trending", getTrendingPost);
postRouter.get("/get/:url", getPost);
postRouter.get("/getbyid/:id", getPostById);
postRouter.get("/search", searchPost);

// for admin only
postRouter.post("/create", createPost);
postRouter.delete("/delete/:id", deletePost);
postRouter.put("/update/:id", updatePost);

// for likes
postRouter.post("/like/:postid", like);
postRouter.post("/dislike/:postid", dislike);

// for tags
postRouter.use("/tag", tagRouter);

// for comments
postRouter.use("/comment", commentRouter);

export default postRouter;
