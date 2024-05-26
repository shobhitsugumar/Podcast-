import Post from "../model/Post.js";
import * as dotenv from "dotenv";
import { CreateError } from "./errorController.js";

dotenv.config({ path: "./config.env" });

import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

//get all post that we have
export const getAllPosts = async (req, res, next) => {
  try {
    const getposts = await Post.find();
    return res.status(200).json({
      success: true,
      data: getposts,
    });
  } catch (error) {
    next(
      CreateError(
        error.status,
        error?.response?.data?.error?.message || error?.message
      )
    );
  }
};

//create a post

export const CreatePost = async (req, res, next) => {
  try {
    const { name, prompt, photo } = req.body;
    const photoUrl = await cloudinary.uploader.upload(photo);

    const createpost = await Post.create({
      name,
      prompt,
      photo: photoUrl?.secure_url,
    });
    return res.status(201).json({
      success: true,
      data: createpost,
    });
  } catch (error) {
    next(
      CreateError(
        error.status,
        error?.response?.data?.error?.message || error?.message
      )
    );
  }
};
