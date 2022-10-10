import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import router from "./routes/router.js";
import makeConnection from "./database/db.js";

const app = express();
dotenv.config();

app.use(bodyParser.json({ extended: "true" }));
app.use(bodyParser.urlencoded({ extended: "true" }));
app.use("/", router);

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log("listening at port", PORT);
});

makeConnection(
  process.env.MONGO_USERNAME,
  process.env.MONGO_PASSWORD,
  process.env.MONGO_URI,
  process.env.MONGO_PORT
);
