import express from "express";
import {
  createUser,
  deleteUser,
  getAllUser,
  getUser,
  updateUser,
} from "../controller/userControllers.js";

const userRouter = express.Router();

//test
userRouter.get("/", getAllUser);

userRouter.post("/create", createUser);
userRouter.get("/get/:id", getUser);
userRouter.put("/update/:id", updateUser);
userRouter.delete("/delete/:id", deleteUser);

export default userRouter;
