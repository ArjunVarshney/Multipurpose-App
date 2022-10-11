import express from "express";
import userRouter from "./userRouter.js";

const router = express.Router();

// crud from user database
router.use("/user", userRouter);

//test command
router.get("/", (req, res) => {
  res.send("hi there");
});

export default router;
