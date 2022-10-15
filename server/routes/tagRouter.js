import express from "express";
import {
  getAllTags,
  getTagData,
  getTaggedPosts,
  getTrendingTags,
} from "../controllers/tagControllers.js";

const tagRouter = express.Router();

tagRouter.get("/", getAllTags);
tagRouter.get("/trendingtags", getTrendingTags);
tagRouter.get("/:tag", getTagData);
tagRouter.get("/:tag/posts", getTaggedPosts);

export default tagRouter;
