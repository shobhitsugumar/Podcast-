import cors from "cors"; //for sercurity purpose
import express from "express";
import mongoose from "mongoose";

import * as dotenv from "dotenv";

import PostRouter from "./route/PostRoute.js";
import GenerateAIRoute from "./route/GenerateAIRoute.js";

dotenv.config({ path: "./config.env" });

const app = express();

app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true }));

//router
app.use("/api/post", PostRouter);
app.use("/api/generateImage", GenerateAIRoute);

//global error handler
app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || "Something went wrong ";
  return res.status(status).json({
    success: false,
    status,
    message,
  });
});

app.get("/", async (req, res) => {
  res.status(200).send({
    message: "Hello Gfg Developers",
  });
});

//function to connect to mongodb

const MonogoConnect = async () => {
  try {
    const DB = process.env.DATABASE.replace(
      "<password>",
      process.env.DATABASE_PASSWORD
    );
    mongoose.set("strictQuery", true);
    mongoose.connect(DB).then(() => console.log("connected to the database "));
  } catch (error) {
    console.log(error);
  }
};

//function to start the server
const startServer = async () => {
  try {
    MonogoConnect();
    app.listen(8080, () => console.log("connnected to the server"));
  } catch (error) {
    console.log(error);
  }
};

startServer();
