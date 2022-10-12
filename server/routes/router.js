import express from "express";
import userRouter from "./userRouter.js";
import postRouter from "./postRouter.js";

const router = express.Router();

// crud from user database
router.use("/user", userRouter);

//crud from post database
router.use("/post", postRouter);

export default router;
