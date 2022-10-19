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
} from "../controllers/postController.js";
import { like, dislike } from "../controllers/likeController.js";

const postRouter = express.Router();

// for testing
postRouter.get("/", getAllPost);

//crud operations
postRouter.get("/getPage/:page", getPaginatedPost);
postRouter.post("/create", createPost);
postRouter.get("/trending", getTrendingPost);
postRouter.get("/get/:url", getPost);
postRouter.get("/search", searchPost);
postRouter.put("/update/:id", updatePost);
postRouter.delete("/delete/:id", deletePost);

// for likes
postRouter.post("/like/:postid", like);
postRouter.post("/dislike/:postid", dislike);

// for tags
postRouter.use("/tag", tagRouter);

// for comments
postRouter.use("/comment", commentRouter);

export default postRouter;
