import express from "express";
import {
  createUser,
  deleteUser,
  getAllUser,
  getUser,
  updateUser,
  savePost,
} from "../controllers/userControllers.js";
import { verify_google_user } from "../middleware/google-auth.js";
import { authorize } from "../middleware/authorizeUser.js";
import { validateUserText } from "../middleware/validateUserText.js";

const userRouter = express.Router();

//test
userRouter.get("/", getAllUser);

userRouter.post("/create/google", verify_google_user, createUser);
userRouter.get("/get/:id", getUser);
userRouter.patch("/save/:id", authorize, savePost);
userRouter.put("/update/:id", authorize, validateUserText, updateUser);
userRouter.delete("/delete/:id", deleteUser);

export default userRouter;
