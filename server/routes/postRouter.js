import express from "express";
import {
  createPost,
  deletePost,
  getAllPost,
  getPost,
  updatePost,
} from "../controllers/postController.js";

const postRouter = express.Router();

//testing
postRouter.get("/", getAllPost);

//crud operations
postRouter.post("/create", createPost);
postRouter.get("/get/:id", getPost);
postRouter.put("/update/:id", updatePost);
postRouter.delete("/delete/:id", deletePost);

export default postRouter;
