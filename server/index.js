import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import router from "./routes/router.js";

const app = express();
dotenv.config();

app.use(bodyParser.json({ extended: "true" }));
app.use(bodyParser.urlencoded({ extended: "true" }));
app.use("/", router);

const PORT = process.env.POR || 8000;

app.listen(PORT, () => {
  console.log("listening at port", PORT);
});
