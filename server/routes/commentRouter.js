import express from "express";
import {
  getAllComments,
  postComment,
  getSingleComment,
} from "../controllers/commentController.js";

const commentRouter = express.Router();

// for testing
commentRouter.get("/", getAllComments);

// crud with comments
commentRouter.post("/post", postComment);
commentRouter.get("/get/:id", getSingleComment)

export default commentRouter;
