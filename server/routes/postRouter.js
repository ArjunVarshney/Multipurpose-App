import express from "express";
import {
  createPost,
  deletePost,
  getAllPost,
  getPost,
  getTrendingPost,
  getPaginatedPost,
  updatePost,
} from "../controllers/postController.js";
import tagRouter from "./tagRouter.js";

const postRouter = express.Router();

// for testing
postRouter.get("/", getAllPost);

//crud operations
postRouter.get("/getPage/:page", getPaginatedPost);
postRouter.post("/create", createPost);
postRouter.get("/trending", getTrendingPost);
postRouter.get("/get/:url", getPost);
postRouter.put("/update/:id", updatePost);
postRouter.delete("/delete/:id", deletePost);

// for tags
postRouter.use("/tag", tagRouter);

export default postRouter;
