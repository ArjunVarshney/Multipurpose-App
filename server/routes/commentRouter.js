import express from "express";
import {
  getAllComments,
  postComment,
  getSingleComment,
  likeComment,
  getBlogComments,
  deleteComment,
} from "../controllers/commentController.js";
import { authorize } from "../middleware/authorizeUser.js";

const commentRouter = express.Router();

// for testing
commentRouter.get("/", getAllComments);

// crud with comments
commentRouter.post("/post", authorize, postComment);
commentRouter.get("/blogcomment/:blogid", getBlogComments);
commentRouter.get("/get/:id", getSingleComment);
commentRouter.post("/like/:commentid", authorize, likeComment);
commentRouter.delete("/delete/:commentid", authorize, deleteComment);

export default commentRouter;
