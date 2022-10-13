import express from "express";
import {
  getAllTags,
  getTagData,
  getTrendingTags,
} from "../controllers/tagControllers.js";

const tagRouter = express.Router();

tagRouter.get("/", getAllTags);
tagRouter.get("/trendingtags", getTrendingTags);
tagRouter.get("/:tag", getTagData);

export default tagRouter;
