import express from "express";
import { generateImage } from "../controller/GenerateimageController.js";

const router = express.Router();

router.post("/", generateImage);

export default router;
