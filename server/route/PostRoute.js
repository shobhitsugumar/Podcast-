import express from "express";
import { getAllPosts, CreatePost } from "../controller/PostController.js";

const router = express.Router();

router.get("/", getAllPosts);
router.post("/", CreatePost);

export default router;
